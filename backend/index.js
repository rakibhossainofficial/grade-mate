import "dotenv/config";
import express from "express";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import cors from "cors";
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://grade-mate-rkr.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const uri = process.env.DB_URI;

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  console.log("token", token);
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    req.user = decode;
    console.log(decode);
    next();
  });
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("grade-mate");
    const assignmentCollection = database.collection("assignments");
    const submittedAssignmentsCollection = database.collection(
      "submitted_assignments"
    );

    app.post("/login", (req, res) => {
      const user = req.body;
      if (!user) {
        return res.status(400).json({ error: "Missing login payload" });
      }

      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "Login successful", token });
    });

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logout successful. Token cleared from cookie." });
    });

    // ✅ Create Assignment
    app.post("/assignment", verifyToken, async (req, res) => {
      const assignment = { ...req.body, createdAt: new Date() };
      const result = await assignmentCollection.insertOne(assignment);
      res.status(201).json(result);
    });

    // 📋 Get All Assignments (supports search & difficulty filter)
    app.get("/assignments", async (req, res) => {
      const { difficulty, search } = req.query;
      const query = {};

      if (difficulty) query.difficulty = difficulty;
      if (search) query.title = { $regex: search, $options: "i" };

      const assignments = await assignmentCollection.find(query).toArray();
      res.json(assignments);
    });

    // 🔍 Get Assignment by ID
    app.get("/assignment/:id", async (req, res) => {
      try {
        const assignment = await assignmentCollection.findOne({
          _id: new ObjectId(req.params.id),
        });
        if (!assignment) return res.status(404).json({ error: "Not found" });
        res.json(assignment);
      } catch {
        res.status(400).json({ error: "Invalid ID" });
      }
    });

    // ✏️ Update Assignment
    app.put("/assignment/:id", verifyToken, async (req, res) => {
      try {
        const update = { ...req.body, updatedAt: new Date() };
        const result = await assignmentCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: update }
        );
        res.json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    // 🗑️ Delete Assignment
    app.delete("/assignment/:id", verifyToken, async (req, res) => {
      try {
        const result = await assignmentCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json(result);
      } catch {
        res.status(400).json({ error: "Invalid ID or delete failed" });
      }
    });
    // 🔍 Preview API: returns only 6 assignments for homepage use
    app.get("/assignments/preview", async (req, res) => {
      try {
        const assignments = await assignmentCollection
          .find({})
          .sort({ dueDate: 1 }) // Optional: earliest due dates first
          .limit(6)
          .toArray();

        res.status(200).json(assignments);
      } catch (error) {
        console.error("Error fetching preview:", error.message);
        res.status(500).json({ error: "Failed to fetch assignment preview" });
      }
    });

    // ✅ Create Submitted Assignment
    app.post("/submitted-assignment", verifyToken, async (req, res) => {
      const submission = {
        ...req.body,
        status: "pending", // ✅ Default status
        submittedAt: new Date(), // Timestamp
      };

      const result = await submittedAssignmentsCollection.insertOne(submission);
      res.status(201).json(result);
    });

    app.get("/pending-assignments", verifyToken, async (req, res) => {
      const { email } = req.query;
      console.log(email);

      try {
        const submissions = await submittedAssignmentsCollection
          .aggregate([
            {
              $match: {
                status: "pending",
              },
            },
            {
              $addFields: {
                assignmentObjId: { $toObjectId: "$assignmentId" },
              },
            },
            {
              $lookup: {
                from: "assignments",
                localField: "assignmentObjId",
                foreignField: "_id",
                as: "assignmentData",
              },
            },
            {
              $unwind: "$assignmentData",
            },
            {
              $match: {
                $or: [
                  { studentEmail: email },
                  { "assignmentData.creator.email": email },
                ],
              },
            },
            {
              $project: {
                assignmentId: 1,
                studentName: 1,
                studentEmail: 1,
                submissionUrl: 1,
                notes: 1,
                status: 1,
                submittedAt: 1,
                "assignmentData._id": 1,
                "assignmentData.title": 1,
                "assignmentData.creator.name": 1,
                "assignmentData.creator.email": 1,
              },
            },
          ])
          .toArray();

        res.json(submissions);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch pending assignments" });
      }
    });

    // 🔍 Get Submitted Assignment by ID
    app.get("/submitted-assignment/:id", verifyToken, async (req, res) => {
      try {
        const submission = await submittedAssignmentsCollection.findOne({
          _id: new ObjectId(req.params.id),
        });

        if (!submission) return res.status(404).json({ error: "Not found" });
        res.json(submission);
      } catch {
        res.status(400).json({ error: "Invalid ID" });
      }
    });

    app.put(
      "/submitted-assignment/check/:id",
      verifyToken,
      async (req, res) => {
        const { id } = req.params;
        const { grades, feedback } = req.body;

        try {
          const result = await submittedAssignmentsCollection.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: {
                grades: Number(grades),
                feedback,
                status: "completed",
                checkedAt: new Date(),
              },
            }
          );

          if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Submission not found" });
          }

          res.json({
            message: "Assignment checked successfully",
            updated: result.modifiedCount,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Failed to update assignment status" });
        }
      }
    );

    app.get("/attempted-assignments", verifyToken, async (req, res) => {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ error: "Email query is required" });
      }

      try {
        const attempted = await submittedAssignmentsCollection
          .aggregate([
            {
              $match: {
                status: "completed",
                studentEmail: email,
              },
            },
            {
              $addFields: {
                assignmentObjId: { $toObjectId: "$assignmentId" },
              },
            },
            {
              $lookup: {
                from: "assignments",
                localField: "assignmentObjId",
                foreignField: "_id",
                as: "assignmentData",
              },
            },
            {
              $unwind: "$assignmentData",
            },
            {
              $project: {
                assignmentId: 1,
                studentName: 1,
                studentEmail: 1,
                submissionUrl: 1,
                notes: 1,
                grades: 1,
                feedback: 1,
                status: 1,
                submittedAt: 1,
                checkedAt: 1,
                "assignmentData._id": 1,
                "assignmentData.title": 1,
                "assignmentData.creator.name": 1,
                "assignmentData.creator.email": 1,
              },
            },
          ])
          .toArray();

        res.json(attempted);
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Failed to fetch attempted assignments" });
      }
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Grade Mate app listening on port ${port}`);
});

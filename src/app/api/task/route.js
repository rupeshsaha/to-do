import Task from "@/models/Task.model";
import { dbConnect } from "@/utils/db";

export async function GET() {
  try {
    await dbConnect();
    const allTasks = await Task.find({});

    if (allTasks.length === 0) {
      return Response.json(
        { message: "No tasks found" },
        {
          status: 201,
        }
      );
    }
    return Response.json(
      { message: "All tasks fetched successfully", allTasks },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(`Error getting tasks : ${error}`);
    return Response.json(
      { message: "Error while fetching tasks" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { title, description, timestamp, category } = await req.json();

    if (!title.trim()  || !category.trim()) {
      return Response.json(
        { message: "All fields are required" },
        {
          status: 400,
        }
      );
    }

    const createdTask = await Task.create({
      title,
      description,
      category,
      timestamp,
    });

    if (!createdTask) {
      return Response.json(
        {
          message: "Error while creating task",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      { message: "Task created successfully", createdTask },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(`Error while creating task : ${error}`);
    return Response.json(
      {
        message: "Error while creating task",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req) {
    try {
        await dbConnect();

        const { id, title, description, timestamp, category } = await req.json();

        if (!id) {
            return Response.json(
                { message: "Id is required to update task" },
                { status: 400 }
            );
        }

        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (timestamp) updateFields.timestamp = timestamp;
        if (category) updateFields.category = category;

        const updatedTask = await Task.findByIdAndUpdate(id, updateFields, {
            new: true,
        });

        if (!updatedTask) {
            return Response.json({ message: "Task not found" }, { status: 404 });
        }

        return Response.json({message : "Task updated successfully", updatedTask}, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return Response.json(
      { message: "Error while updating task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
    try {
        await dbConnect()
        const { id } = await req.json()

            if (!id) {
              return Response.json(
                { message: "Id is required to delete task" },
                { status: 400 }
              );
        }
        
        await Task.findByIdAndDelete(id)

        return Response.json({message: "Task deleted successfully"},{status: 200}) 
    } catch (error) {
         return Response.json(
           { message: "Error while deleting task" },
           {
             status: 500,
           }
         );
    }
}
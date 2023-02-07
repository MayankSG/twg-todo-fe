import TaskForm from "../../components/task/TaskForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskPage() {
  const param = useParams();
  const [isFormType, setIsFormType] = useState("create");

  useEffect(() => {
    if (param.id) {
      setIsFormType("update");
    }
  }, [param]);
  return (
    <main className="main-content mt-0">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto my-4">
            <div className="card my-4">
              <div className="card-header">
                <h4 className="font-weight-bolder">
                  {isFormType === "create" ? "Create New Task" : "Update Task"}
                </h4>
              </div>
              <div className="card-body">
                <TaskForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TaskPage;

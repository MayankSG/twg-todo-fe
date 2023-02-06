import EditForm from "../../components/task/EditForm";

function TaskEditPage() {
  return (
    <body className="">
      <main className="main-content  mt-0">
        <section>
          <div className="page-header ">
            <div className="container">
              <div className="row">
                <div class="col-6">
                  <div class="card my-4">
                    <div className="card-header">
                      <h4 className="font-weight-bolder"> Edit Task</h4>
                    </div>
                    <div className="card-body">
                      <EditForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
}

export default TaskEditPage;

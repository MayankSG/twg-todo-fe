import CreateForm from "../../components/task/CreateForm";

function TaskCreatePage() {
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
                      <h4 className="font-weight-bolder">Create New Task</h4>
                    </div>
                    <div className="card-body">
                      <CreateForm />
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

export default TaskCreatePage;

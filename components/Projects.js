import React from "react";

const Projects = () => {
  return (
    <section id="projects" className="py-16 bg-base-200">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example project card */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">Project 1</h3>
              <p>Brief description of the project.</p>
              <a href="#" className="btn btn-primary">View Project</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

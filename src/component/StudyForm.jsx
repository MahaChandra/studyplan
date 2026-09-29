import { useState, useEffect } from "react";

function StudyForm({
  setStudies,
  editStudy,
  setEditStudy
}) {

  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    description: ""
  });


  useEffect(() => {

    if (editStudy) {

      setFormData({
        subject: editStudy.subject,
        topic: editStudy.topic,
        description: editStudy.description
      });

    }

  }, [editStudy]);


  const addClick = () => {

    const newStudy = {
      id: Date.now(),
      ...formData,
      completed: false
    };

    setStudies((previousStudies) => [
      ...previousStudies,
      newStudy
    ]);

    setFormData({
      subject: "",
      topic: "",
      description: ""
    });
  };


  const updateClick = () => {

    setStudies((previousStudies) =>
      previousStudies.map((study) =>
        study.id === editStudy.id
          ? {
              ...study,
              ...formData
            }
          : study
      )
    );

    setEditStudy(null);

    setFormData({
      subject: "",
      topic: "",
      description: ""
    });
  };


  return (
    <section className="study-form">

      <div className="form-title">

        <div className="plus-circle">
          +
        </div>

        <h2>
          {editStudy ? "Update Study" : "Add New Study"}
        </h2>

      </div>


      <div className="form-fields">

        <div className="form-group">

          <label>Subject</label>

          <input
            type="text"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({
                ...formData,
                subject: e.target.value
              })
            }
          />

        </div>


        <div className="form-group">

          <label>Topic</label>

          <input
            type="text"
            placeholder="Enter topic "
            value={formData.topic}
            onChange={(e) =>
              setFormData({
                ...formData,
                topic: e.target.value
              })
            }
          />

        </div>


        <div className="form-group">

          <label>Description</label>

          <textarea
            placeholder="Enter description "
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
            }
          ></textarea>

        </div>

      </div>


      <button
        className="add-button"
        onClick={editStudy ? updateClick : addClick}
      >

        <span>+</span>

        {editStudy ? "Update Study" : "Add Study"}

      </button>

    </section>
  );
}

export default StudyForm;
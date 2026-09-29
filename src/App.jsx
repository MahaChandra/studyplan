import { useState,useEffect } from "react";
import "./App.css";
import StudyForm from "./component/StudyForm";
import StudyList from "./component/StudyList";
import image from "./assets/image.png"

function App() {
  const [studies, setStudies] = useState(() => {
  const savedStudies = localStorage.getItem("studies");

  if (savedStudies) {
    console.log(JSON.parse(savedStudies));
    
    
    return JSON.parse(savedStudies);
  }

  return [];
});
  const [editStudy, setEditStudy] = useState(null);

  useEffect(() => {
  localStorage.setItem("studies", JSON.stringify(studies));

  // console.log(JSON.stringify(studies));
}, [studies]);




  // const toggleStudy = (id) => {
    
  //   setStudies((previousStudies) =>
  //     previousStudies.map((study) =>
  //       study.id === id ? { ...study, completed: !study.completed } : study,
  //     ),
  //   );
  // };


  const toggleStudy = (id) => {
  setStudies((previousStudies) =>
    previousStudies.map((study) => {
      if (study.id === id) {
        console.log("Toggling study:", study);
        console.log("Old status:", study.completed);
        console.log("New status:", !study.completed);

        return {
          ...study,
          completed: !study.completed
        };
      }

      return study;
    })
  );
};

  const deleteStudy = (idno) => {
    
    setStudies((previousStudies) => {
      const deletedStudy = previousStudies.find((study) => study.id === idno);
      
      console.log(deletedStudy);
      
      alert(`${deletedStudy.subject} study has been deleted.`);

      return previousStudies.filter((study) => study.id !== idno);
    });
  };

  const handleEdit = (study) => {
    console.log(study);
    
    setEditStudy(study);
  };

  return (
  <div className="app">

    <header className="header">
      <div>
        <img src={image} alt="" />
        <h1>Study Planner</h1>
      </div>
      
      <p>Plan your learning. Track your progress.</p>
    </header>

    <main className="container">

      <StudyForm
        setStudies={setStudies}
        editStudy={editStudy}
        setEditStudy={setEditStudy}
      />

      <StudyList
        studies={studies}
        toggleStudy={toggleStudy}
        deleteStudy={deleteStudy}
        handleEdit={handleEdit}
      />

    </main>

  </div>
);


}

export default App;

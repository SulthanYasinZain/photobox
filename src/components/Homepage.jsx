import { useNavigate } from "react-router-dom";
import vector1 from "../assets/Vector 1.png";
import vector2 from "../assets/Vector 2.png";
import vector3 from "../assets/Vector 3.png";

function Homepage() {
  const navigate = useNavigate();
  const takephoto = () => {
    navigate("/capture");
  };

  return (
    <>
      <div className="flex absolute items-center h-screen">
        <h1 className="text-text font-bold text-4xl z-10 ml-10">
          Snapshot Your Memories With{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Photocard
          </span>
        </h1>
        <img src={vector1} className="absolute" />
        <img src={vector2} className="absolute" />
        <img src={vector3} className="absolute" />
        <button
          onClick={takephoto}
          className="w-screen h-screen absolute bg-transparent"
        ></button>
      </div>

      <div className="flex  h-screen items-end justify-center p-10">
        <p className="text-text absolute text-center">
          Touch Anywhere To Start
        </p>
      </div>
    </>
  );
}

export default Homepage;

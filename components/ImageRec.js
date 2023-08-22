import Link from "next/link";

export default function ImageRec() {
  return (
    <div>
      <div className="flex flex-col items-center text-center bg-sky-200 rounded-xl shadow-xl mb-8">
        <h2 className="card-title text-black pt-4 ">Symbol Recognition Demo</h2>
        <div className="card-body items-left text-center pt-2">
          <p className="text-black text-justify text-sm md:text-base">
            Below is a Gradio demo of symbol recognition YOLOv5 models, hosted
            on HuggingFace Spaces. The models and the inference pipeline can be
            found here:
          </p>
          <ul className="space-y-4 list-inside list-disc text-left text-sm md:text-base text-sky-800">
            <li>
              <Link
                className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                href="https://huggingface.co/spaces/pyesonekyaw/Image_Recognition-CZ3004_SC2079_Multidisciplinary_Project-NTU_SG"
              >
                HuggingFace Spaces Gradio Demo
              </Link>
            </li>
            <li>
              <Link
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                href="https://huggingface.co/pyesonekyaw/MDP_ImageRecognition_YOLOv5_Week_8_AY22-23_NTU-SG"
              >
                Week 8 Model
              </Link>
            </li>
            <li>
              <Link
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                href="https://huggingface.co/pyesonekyaw/MDP_ImageRecognition_YOLOv5_Week_9_AY22-23_NTU-SG"
              >
                Week 9 Model
              </Link>
            </li>
            <li>
              <Link
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                href="https://github.com"
              >
                Inference Pipeline 
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
      <gradio-app src="https://pyesonekyaw-image-recognition-cz3004-sc2079-mult-848afe7.hf.space"></gradio-app>
      <div className="flex flex-col items-center text-center bg-sky-200 rounded-xl shadow-xl my-8">
        <div className="card-body items-center text-center p-4">
          <h2 className="card-title text-black">Some Thoughts</h2>
          <p className="text-black text-justify text-sm md:text-base">
            Symbol recognition, or image recognition as students like to call
            it, is an incredibly easy and foolproof task. You do not need more
            than one person working on this, and that person should also be
            working on the algorithm or the Raspberry Pi as well minimally. If
            your group members say they want two people, they are either
            inexperienced or they are just trying to get a free ride.
          </p>
          <p className="text-black text-justify text-sm md:text-base">
            I did do some unique things for this subtask, such as first training
            the model on all the valid data I could find online, and adding in
            some heuristics. More details can be found in the blog post coming
            in the near future. I also did some camera calibration for the
            Raspberry Pi camera, the code for which can be found in the pipeline
            repository.
          </p>
          <p className="text-black text-justify text-sm md:text-base">
            Post graduation update: If the model doesn&apos; get a perfect score for the tasks, you should probably fail the person&apos;s peer review. 
            At least from what my juniors told me, the entire codebase across all my MDP-related repositories is still entirely reusuable for 2023 Semester 1.
          </p>
        </div>
      </div>
    </div>
  );
}

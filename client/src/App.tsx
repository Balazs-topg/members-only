//import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    signUp: any;
    logIn: any;
    yourSubmissionWasRegistered: any;
  }
}

function SignUpForm() {
  const [yourSubmissionWasRegistered, setYourSubmissionWasRegistered] =
    useState(false);
  const [currentlySubmitting, setCurrentlySubmitting] = useState(false);
  const [usernameIsTaked, setUsernameIsTaked] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null); // Add the type annotation
  const emailRef = useRef<HTMLInputElement>(null); // Add the type annotation
  const usernameRef = useRef<HTMLInputElement>(null); // Add the type annotation
  const passwordRef = useRef<HTMLInputElement>(null); // Add the type annotation

  useEffect(() => {
    if (yourSubmissionWasRegistered == true) {
      window.yourSubmissionWasRegisteredModal.showModal();
    } else {
      window.signUp.close();
    }
  }, [yourSubmissionWasRegistered]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    axios
      .post("http://localhost:3000/sign-up", { formData })
      .then((res) => {
        if (res.data == "valid") {
          setCurrentlySubmitting(false);
          window.signUp.close();
          setYourSubmissionWasRegistered(true);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error == "username is taken") {
          setUsernameIsTaked(true);
          setCurrentlySubmitting(false);
        }
      });
    // Now you can use formData to send the data to the server or perform any other action
  };
  if (!yourSubmissionWasRegistered) {
    return (
      <dialog id="signUp" className="modal">
        <form
          className="modal-box border border-base-300"
          onSubmit={(event) => {
            handleSubmit(event);
            setCurrentlySubmitting(true);
          }}
        >
          <h3 className="font-bold text-lg mb-4">Sign up</h3>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">What is your name? (*)</span>
              <span className="label-text-alt">e.g. John Doe</span>
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered w-full"
              ref={nameRef}
            />
            <label className="label">
              <span className="label-text-alt hidden">error message</span>
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                What is your email address? (*)
              </span>
              <span className="label-text-alt">e.g. john.doe@gmail.com</span>
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="email address"
              className="input input-bordered w-full"
              ref={emailRef}
            />
            <label className="label">
              <span className="label-text-alt hidden">error message</span>
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Choose username (*)</span>
              <span className="label-text-alt">e.g. x_John_Doe_x</span>
            </label>
            <input
              required
              name="username"
              type="text"
              placeholder="username"
              className="input input-bordered w-full"
              ref={usernameRef}
            />
            <label className="label">
              {usernameIsTaked ? (
                <span className="label-text-alt text-error font-semibold">
                  username is taken, please choose a different one
                </span>
              ) : null}
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Choose a password (*)</span>
              <span className="label-text-alt">keep this a secret</span>
            </label>
            <input
              required
              type="password"
              name="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              ref={passwordRef}
            />
            <label className="label">
              <span className="label-text-alt hidden">error message</span>
            </label>
          </div>
          {currentlySubmitting ? (
            <button
              type="submit"
              className="btn btn-secondary btn-block btn-disabled"
            >
              <span className="loading loading-spinner loading-md"></span>
            </button>
          ) : (
            <button type="submit" className="btn btn-secondary btn-block">
              Sign up
            </button>
          )}
          <div
            onClick={() => {
              window.signUp.close();
              window.logIn.showModal();
            }}
            className="text-center w-full mt-2 font-semibold opacity-60 text-sm select-none cursor-pointer"
          >
            <p>Already have an account?</p>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  } else {
    return (
      //<button className="btn" onClick={()=>window.yourSubmissionWasRegisteredModal.showModal()}>open modal</button>
      <dialog
        id="yourSubmissionWasRegisteredModal"
        className="modal"
        onClick={() => {
          setYourSubmissionWasRegistered(false);
        }}
      >
        <form method="dialog" className="modal-box border border-base-300">
          <h3 className="font-bold text-lg"> Your account was registed!</h3>
          <p className="py-4">you are now logged in</p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>okay</button>
        </form>
      </dialog>
    );
  }
}

function Post() {
  return (
    <div className="bg-base-100 p-4 rounded-xl border border-base-300 w-full shadow-lg">
      <h3 className="font-semibold text-base-content opacity-60 text-sm">
        Posted by:{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => {
            window.logIn.showModal();
          }}
        >
          Log in to see
        </span>
      </h3>
      <h2 className="font-bold">Lorem</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat unde
        nostrum optio maxime pariatur eaque qui fugit aliquam delectus
        perspiciatis perferendis, obcaecati, repudiandae dignissimos sapiente
        dolorem, modi asperiores eveniet eum.
      </p>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="bg-base-100 h-full shadow-xl border-b border-base-300 p-4 ">
        <ul className="flex items-center gap-4 max-w-6xl mx-auto">
          <li className="bg-base-200 font-bold text-xl rounded-md p-1 px-4">
            MembersOnly
          </li>
          <button className="ml-auto btn btn-sm btn-secondary shadow-sm flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            create post
          </button>

          <li className="flex justify-center items-center mx-2">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              <svg
                className="swap-on fill-primary w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-primary w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </li>
          <li>
            <button
              className=" btn btn-primary btn-sm"
              onClick={() => window.logIn.showModal()}
            >
              log in
            </button>
          </li>
          <li>
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => window.signUp.showModal()}
            >
              sign up
            </button>
          </li>
        </ul>
        <dialog id="logIn" className="modal">
          <form method="dialog" className="modal-box border border-base-300">
            <h3 className="font-bold text-lg mb-4">Log in</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">What is your username?</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt hidden">Bottom Left label</span>
              </label>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Enter your password</span>
                <span className="label-text-alt">keep this a secret</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt hidden">Bottom Left label</span>
              </label>
            </div>

            <div className="btn btn-secondary btn-block">log in</div>

            <button
              onClick={() => {
                window.signUp.showModal();
              }}
              className="text-center w-full mt-2 font-semibold opacity-60 text-sm select-none cursor-pointer"
            >
              <p>Don't have an account?</p>
            </button>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <SignUpForm />
      </nav>
      <div className="flex flex-col items-center gap-4 max-w-6xl mx-auto p-4">
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
      </div>
    </>
  );
}

export default App;

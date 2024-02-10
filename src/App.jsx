import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FormField from "./components/common/FormField";

function App() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPass: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[!@#$%^&*])/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
      repeatPass: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please repeat your password"),
    }),
  });
  const success = () => toast("login successful");
  const loading = () => toast("Cheking info");
  const navigate = useNavigate();
  const hadleLogin = async () => {
    const isValid = await formik.validateForm();
    if (!Object.keys(isValid).length) {
      loading();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      success();
      await new Promise((resolve) => setTimeout(resolve, 5000));
      navigate("/target");
    }
  };
  return (
    <>
      <ToastContainer theme="dark" autoClose={3000} />

      <main className="border border-primary rounded-lg p-10 min-w-[25vw]">
        <h1 className="mb-10">Sign Up</h1>
        <form
          className="flex flex-col items-start justify-center gap-2"
          onSubmit={formik.handleSubmit}
        >
          <FormField
            type="text"
            name="name"
            label="Name:"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-rose-400">{formik.errors.name}</div>
          ) : null}
          <FormField
            type="email"
            name="email"
            label="Email:"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-rose-400">{formik.errors.email}</div>
          ) : null}
          <FormField
            type="password"
            name="password"
            label="Password:"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-rose-400">{formik.errors.password}</div>
          ) : null}
          <FormField
            type="password"
            name="repeatPass"
            label="Password Repeat:"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPass}
          />
          {formik.touched.repeatPass && formik.errors.repeatPass ? (
            <div className="text-rose-400">{formik.errors.repeatPass}</div>
          ) : null}

          <button
            type="submit"
            className="btn btn-primary mt-8 w-[120px]"
            onClick={hadleLogin}
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
}

export default App;

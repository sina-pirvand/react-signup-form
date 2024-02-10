/* eslint-disable react/prop-types */
const FormField = ({ type, label, name, ...props }) => {
  return (
    <>
      <label htmlFor="email" className="text-xl mt-4">
        {label}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        {...props}
        placeholder="Type here"
        className="input input-bordered input-primary w-full"
      />
    </>
  );
};
export default FormField;

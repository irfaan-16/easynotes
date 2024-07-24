const page = ({ params }: { params: any }) => {
  const decodedEmail = decodeURIComponent(params.gmail);
  console.log(decodedEmail);
  return (
    <div>
      <h1>User profile page </h1>
      <p>Email:{decodedEmail}</p>
    </div>
  );
};

export default page;

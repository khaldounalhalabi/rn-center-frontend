const Page = ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  return (
      <div>Appointment Id : {appointmentId}</div>
  );
};

export default Page;

const Error = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <p className='text-red'>{children}</p>
    </div>
  );
};

export default Error;

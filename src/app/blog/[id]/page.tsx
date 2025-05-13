import React, { use } from 'react';

export default function Blog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // const [value, setValue] = useState('');
  // const [email, setEmail] = useState('');
  // const [emailError, setEmailError] = useState('');

  // const validateEmail = (value: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!emailRegex.test(value) && value !== '') {
  //     setEmailError('Invalid email address');
  //   } else {
  //     setEmailError('');
  //   }
  // };

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;

  //   setEmail(value);

  //   validateEmail(value);
  // };
  // console.log(value);

  return (
    <div>
      {id}
      {/* <div className="space-y-4 p-4">
        <Input
          label="Username"
          placeholder="Enter your username"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <Input
          label="Email"
          placeholder="example@email.com"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />
      </div> */}
    </div>
  );
}

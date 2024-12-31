import React from 'react';
// import { Card } from '@/components/CardName';
import Container from "@/components/Container";

function Page() {

  const getName = "Lorem";
  const greeting = (): string => {
    const clock = new Date().getHours();
    if (clock < 12) {
      return "Good Morning";
    } else if (clock < 18) {
      return "Good Afternoon";
    } else if (clock < 22) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  }

  return (
    <>
      <p style={{ fontSize: "23px", marginTop: "23px" }}>Hai, {getName} !!!!, {greeting()} 👋</p>

      {/* konten */}
      <div className='mt-16'>
        <p>Short Summary</p>

        <Container>
          <p>lakjwd

          </p>
        </Container>
      </div>
    </>
  );
}

export default Page;
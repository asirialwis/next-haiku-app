import React from "react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();

async function gethaiku(id) {
  const result = await prisma.haiku.findMany({
    where: {
      authorId: id,
    },
  });
  // console.log(result);
  return result;
}

export default async function Dashboard(props) {
  const haikus = await gethaiku(props.user.userId);

  return (
    <div>
      <h2 className="text-center text-2xl text-gray-600 mb-5">Your Haikus</h2>
      {haikus.length === 0 ? (

        
        <p className="text-center text-gray-500">No Haikus Found</p>
      ) : (
        haikus.map((haiku, index) => {
          return (
            <div key={index}>
              {haiku.line1}
              <br />
              {haiku.line2}
              <br />
              {haiku.line3}
              <br />
              <Link href ={`edit-haiku/${haiku.id}`}>Edit</Link>
              <hr/>
            </div>
          );
        })
      )}
    </div>
  );
}

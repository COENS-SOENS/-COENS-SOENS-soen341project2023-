import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const PostingsList = () => {
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());

    onValue(dbRef, (snapshot) => {
      const postData = snapshot.val();
      const postingsList = [];
      for (let id in postData.Postings) {
        postingsList.push({
          id,
          Company: postData.Postings[id].Company,
          Description: postData.Postings[id].Description,
          Job: postData.Postings[id].Job,
          Salary: postData.Postings[id].Salary

        });
      }
      setPostings(postingsList);

    });
  }, []);

  return (
    <div>

      {postings.map(posting => (
        <div key={posting.id}>
          <h2>{posting.Job} at {posting.Company}</h2>
          <p>{posting.Description}</p>
          <p>Salary: {posting.Salary}</p>
        </div>
      ))}
      
    </div>
  );
};

export default PostingsList;




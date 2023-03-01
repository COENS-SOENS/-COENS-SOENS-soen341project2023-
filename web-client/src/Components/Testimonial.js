import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles.css";
import { Avatar } from "@mui/material";

const Testimonial = () => {
  return (
    <div className="testimonial" style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <div style={{ width: "50%", textAlign: "center" }}>
        <h1 style={{ marginBottom: 20 }}>Testimonials</h1>
        <Slider>
          <Card img="https://img.freepik.com/premium-vector/african-american-woman-avatar-with-glasses-portrait-young-girl-vector-illustration-face_217290-1034.jpg?w=740"
                text="I found my dream job within a week of signing up, Thanks EmployMe!! :) " 
                name="Alice Wonderland"
                tile="Recent Graduate"/>
          <Card img="https://www.landmark-maps.com/wp-content/uploads/2021/11/avatar-woman-300x300.png"
                text="EmployMe is amazing! I got hired in less than a month after signing up."
                name="Snow White"
                title="Candidate" />
          <Card img="https://cdn-icons-png.flaticon.com/512/2922/2922752.png" 
                text="Thanks to EmployMe, I have discovered people with amazing potetional."
                name="Jasmine Hadid"
                title="Hiring Manager"/>
          <Card img="https://cdn-icons-png.flaticon.com/512/236/236832.png"
                text="The EmployMe team was very helpful throughout my job search process. 
                They provided valuable feedback on my resume and cover letter, 
                which helped me land a job offer quickly." 
                name="Lee Xua"
                title="Candidate"/>
        </Slider>
      </div>
    </div>
  );
};

const Card = ({ img, text, name, title }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Avatar src={img} imgProps={{ style: { borderRadius: "50%" } }} style={{ width: 120, height: 120, marginBottom: 20 }} />
      <p>{text}</p>
      <p style={{ fontStyle: "italic", marginTop: 10 }}>
        <span style={{ fontWeight: 500, color: "#0275d8" }}>{name}</span>, {title}
      </p>
    </div>
  );
};

export default Testimonial;

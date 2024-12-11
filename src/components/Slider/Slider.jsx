import React, { useState } from "react";
import styles from "./slider.module.css";
import { ArrowLeft, ArrowRight, Dot } from "lucide-react";

const Slider = () => {
  const people = [
    {
      id: 1,
      image: "https://www.course-api.com/images/people/person-1.jpeg",
      name: "maria ferguson",
      title: "office manager",
      quote:
        "Fingerstache umami squid, kinfolk subway tile selvage tumblr man braid viral kombucha gentrify fanny pack raclette pok pok mustache.",
    },
    {
      id: 2,
      image: "https://www.course-api.com/images/people/person-4.jpeg",
      name: "john doe",
      title: "regular guy",
      quote:
        "Gastropub sustainable tousled prism occupy. Viral XOXO roof party brunch actually, chambray listicle microdosing put a bird on it paleo subway tile squid umami.",
    },
    {
      id: 3,
      image: "https://www.course-api.com/images/people/person-3.jpeg",
      name: "peter smith",
      title: "product designer",
      quote:
        "Drinking vinegar polaroid street art echo park, actually semiotics next level butcher master cleanse hammock flexitarian ethical paleo.",
    },
    {
      id: 4,
      image: "https://www.course-api.com/images/people/person-2.jpeg",
      name: "susan andersen",
      title: "the boss",
      quote:
        "Marfa af yr 3 wolf moon kogi, readymade distillery asymmetrical seitan kale chips fingerstache cloud bread mustache twee messenger bag. ",
    },
  ];
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => 
      prevIndex === people.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setIndex((prevIndex) => 
      prevIndex === 0 ? people.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
        {people.map((person, personIndex) => (
          <img
            key={person.id}
            className={styles.img}
            style={{
              translate: `${index * -100}%`,
            }}
            src={person.image}
            alt={person.name}
          />
        ))}
        <div className={styles.btns}>
          <div className={styles.btn} onClick={prevSlide}>
            <ArrowLeft />
          </div>
          <div className={styles.btn} onClick={nextSlide}>
            <ArrowRight />
          </div>
        </div>
        <div className={styles.dots}>
          {people.map((_, dotIndex) => (
            <div
              key={dotIndex}
              className={`${styles.dot} ${index === dotIndex ? styles.activeDot : ''}`}
              onClick={() => goToSlide(dotIndex)}
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
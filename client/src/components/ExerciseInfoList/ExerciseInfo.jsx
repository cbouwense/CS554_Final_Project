import React from 'react';

const ExerciseEvent = ({
  exercise: { name, description, images, bodyparts_worked, equipment }
}) => {
  return (
    <div id={name.replace(/\s/g, '')} className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{name}</p>
          </div>
        </div>

        <div className="content">
          {description && <p>{description}</p>}
          {bodyparts_worked && (
            <>
              <p>Body Parts Worked</p>
              <ul>
                {bodyparts_worked.map((part, i) => (
                  <li key={i}>{part}</li>
                ))}
              </ul>
            </>
          )}
          {equipment && (
            <>
              <p>Equipment Needed</p>
              <ul>
                {equipment.map((equip, i) => (
                  <li key={i}>{equip}</li>
                ))}
              </ul>
            </>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default ExerciseEvent;

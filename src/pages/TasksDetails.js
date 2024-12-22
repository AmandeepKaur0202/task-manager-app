import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTaskById } from '../features/tasksSlice';


const TaskDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.tasks);


  // Fetch task details when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <h1>Task Details</h1>
      {task ? (
        <ul>
          <li>Title: {task.title}</li>
          <li>Assigned To: {task.assignedTo}</li>
          <li>Status: {task.status}</li>
          <li>Priority: {task.priority}</li>
          <li>Start Date: {task.startDate}</li>
          <li>End Date: {task.endDate || 'N/A'}</li>
        </ul>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};

export default TaskDetails;

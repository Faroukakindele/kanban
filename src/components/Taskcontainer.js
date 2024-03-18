import TaskItem from "./TaskItem";
import styles from "./Taskcontainer.module.css";
function Taskcontainer({ data, status }) {
  const { tasks } = data;

  const sortedTasks = tasks?.sort((a, b) => {
    if (a.title > b.title) return 1;
    else if (a.title < b.title) return -1;
    else return 0;
  });

  return (
    <div className={`${styles.container} `}>
      <h2 className={`${styles.status} `}>
        {" "}
        <div style={{ backgroundColor: data.color }}></div>
        {status} ({tasks?.length || 0}){" "}
      </h2>

      {tasks?.length ? (
        sortedTasks?.map((task, i) => (
          <TaskItem status={status} color={data.color} key={i} task={task} />
        ))
      ) : (
        <NoTasks />
      )}
    </div>
  );
}

export default Taskcontainer;
function NoTasks() {
  return (
    <div className={styles.noTasks}>
      <h1> There are not tasks added yet</h1>
    </div>
  );
}

import React from 'react';
import styles from './Treeview.module.css';

const explorer = [
  {
    name: "folder-view",
    children: []
  },
  {
    name: "js-questions",
    children: [
      {
        name: "folder-view.js"
      },
      {
        name: "hasOwnProperty.js"
      },
      {
        name: "inner-folder",
        children: [
          {
            name: "innermost",
            children: []
          },
          {
            name: "file-1.ts"
          },
          {
            name: "file-2.ts"
          }
        ]
      }
    ]
  },
  {
    name: "progress-bar",
    children: [
      {
        name: "index.html"
      },
      {
        name: "index.js"
      },
      {
        name: "styles.css"
      }
    ]
  },
  {
    name: "package.json"
  }
];

const Treeview = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {
          explorer?.map(exp => <Tree data={exp} level={0} />)
        }
      </div>
    </div>
  )
}

export default Treeview

function Tree({ data, level }) {
  return <div className={styles.fileContainer}>
    <div style={{
      marginLeft: `${level * 30}px`
    }} className={styles.file}>
      {data.name}
    </div>
    {data?.children && data?.children.length > 0 && data?.children?.map(child => <Tree data={child} level={level + 1} />)}
  </div>
}


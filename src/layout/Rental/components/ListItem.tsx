import React from "react";
import styles from "../index.module.scss";
const ListItem = ({ listItem }: { listItem: any[] }) => {
  return (
    <div className={styles.listItem}>
      {listItem.map((item, index) => (
        <div className={styles.item} key={index}>
          <div
            className={styles.itemImage}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          ></div>
          <div className={styles.itemDetail}>
            <span className={styles.itemType}>
              CHUNG CƯ MINI
            </span>
            <h3 className={styles.itemName}>
              {item.title}
            </h3>
            <p>{item.type}</p>
            <h5 className={styles.itemPrice}>
              {item.price}đ/tháng
            </h5>
            <p>{item.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListItem;

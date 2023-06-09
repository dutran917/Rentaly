import React from "react";
import styles from "../index.module.scss";
import { Spin } from "antd";
const ListItem = ({
  listItem,
  loading,
}: {
  listItem?: any;
  loading: boolean;
}) => {
  return (
    <div className={styles.listItem}>
      {loading && (
        <div
          style={{
            margin: "auto",
          }}
        >
          <Spin />
        </div>
      )}
      {!loading &&
        listItem?.data?.map((item: any, index: number) => (
          <a
            className={styles.itemContainer}
            key={index}
            href={`/rental/${item?.id}`}
          >
            <div className={styles.item}>
              <div
                className={styles.itemImage}
                style={{
                  backgroundImage: `url(${item?.image[0]?.url})`,
                }}
              ></div>
              <div className={styles.itemDetail}>
                <span className={styles.itemType}>
                  CHUNG CƯ MINI
                </span>
                <h3 className={styles.itemName}>
                  {item?.title}
                </h3>
                <p>{`Phòng 1 khách - ${item?.rooms[0]?.bed_room} ngủ`}</p>
                <h5 className={styles.itemPrice}>
                  {item?.rooms[0]?.price}đ/tháng
                </h5>
                <p>{item.address}</p>
              </div>
            </div>
          </a>
        ))}

      {listItem?.data?.length === 0 && (
        <div
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "red",
            margin: "auto",
          }}
        >
          Không có dữ liệu
        </div>
      )}
    </div>
  );
};

export default ListItem;

import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useRequest } from "ahooks";
import { getDetailApartment } from "../../service";
import { Carousel } from "@sefailyasoz/react-carousel";
import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
const DetailRental = () => {
  const router = useRouter();
  const { id } = router.query;
  const data = useRequest(getDetailApartment, {
    manual: true,
    onSuccess: (res) => {
      console.log(res);
    },
  });
  useEffect(() => {
    if (id) {
      data.run(Number(id));
    }
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <Carousel
        data={
          data?.data?.data
            ? data.data?.data?.image?.map((item: any) => ({
                headerText: null,
                subText: "Sub Text One",
                image: item?.url,
              }))
            : []
        }
        rightItem={<RightOutlined />}
        leftItem={<LeftOutlined />}
        animationDuration={3000}
        size="normal"
      />
    </div>
  );
};

export default DetailRental;

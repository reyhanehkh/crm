import { Card, Col } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Doughnut } from "react-chartjs-2";
import { localizeNumbers } from "../../functions";
import AppLink from "../router/app-link";

export default function ServiceSlider({
  timeOfService,
  totalTraffic,
  timedTraffic,
}) {
  const getSlideData = (total, remind) => {
    const remindPercent = (remind * 100) / total;
    return [remindPercent, 100 - remindPercent];
  };
  var data = [
    {
      datasets: [
        {
          data: getSlideData(timeOfService.total, timeOfService.remind),
          backgroundColor: ["#1279cd", "#e3e5ea"],
          hoverBackgroundColor: ["#1279cd", "#e3e5ea"],
          borderWidth: 0,
        },
      ],
    },
    {
      datasets: [
        {
          data: getSlideData(totalTraffic.total, totalTraffic.remind),
          backgroundColor: ["#d52727", "#e3e5ea"],
          hoverBackgroundColor: ["#d52727", "#e3e5ea"],
          borderWidth: 0,
        },
      ],
    },
  ];
  let totalSlide = 2;
  if (timedTraffic) {
    data.push({
      datasets: [
        {
          data: getSlideData(timedTraffic.total, timedTraffic.remind),
          backgroundColor: ["#89c26b", "#e3e5ea"],
          hoverBackgroundColor: ["#89c26b", "#e3e5ea"],
          borderWidth: 0,
        },
      ],
    });
    totalSlide++;
  }
  const options = {
    cutout: "80%",
    responsive: false,
    legend: {
      display: false,
    },
    animation: {
      duration: 500,
      easing: "easeInCubic",
    },
    tooltip: {
      enabled: false,
    },
  };
  return (
    <Col xs={12} sm={6} className="mb-3 mb-sm-0">
      <Card className="bcard" dir="ltr" style={{ maxWidth: "500px" }}>
        <Splide
          onMove={(splide, newIndex) => {
            if (newIndex === 0) splide.Components.Controller.go(1);
            if (newIndex > totalSlide)
              splide.Components.Controller.go(totalSlide);
            // console.log('newIndex', s    plide, newIndex, oldIndex, destIndex);
          }}
          options={{
            //type: 'loop',
            focus: "center",
            start: 2,
            perPage: 3,
            gap: "10px",
            updateOnMove: true,
            pagination: false,
            breakpoints: {
              768: {
                perPage: 2.2,
                start: 2.5,
              },
            },
          }}
        >
          <SplideSlide />
          <SplideSlide>
            <div className=" h-100 d-flex flex-column mx-2 px-2 py-3">
              <div className="d-flex text-center">
                <div className="flex-grow-1 mb-3">
                  <div className="text-nowrap text-100 text-dark-l2">
                    زمان باقیمانده
                    <br />
                  </div>
                </div>
              </div>
              <div className="align-self-center pos-rel text-blue">
                <Doughnut data={data[0]} options={options} />
                <span className="position-center text-600 text-110 text-dark-tp4">
                  {localizeNumbers(timeOfService.remind)} روز
                </span>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className=" h-100 d-flex flex-column mx-2 px-2 py-3">
              <div className="d-flex text-center">
                <div className="flex-grow-1 mb-3">
                  <div className="text-nowrap text-100 text-dark-l2">
                    ترافیک باقیمانده
                    <br />
                    <AppLink
                      to="/usages"
                      className="text-blue-d2 position-bc  pb-2 pt-4"
                    >
                      <small>
                        <i className="far fa-hand-point-left"></i>
                        جزییات مصرف
                      </small>
                    </AppLink>
                  </div>
                </div>
              </div>
              <div className="align-self-center pos-rel text-danger mb-4">
                <Doughnut data={data[1]} options={options} />
                <span className="position-center text-600 text-110 text-dark-tp4">
                  {localizeNumbers(Math.round(totalTraffic.remind))} گیگ
                </span>
              </div>
            </div>
          </SplideSlide>
          {timedTraffic && (
            <SplideSlide>
              <div className=" h-100 d-flex flex-column mx-2 px-2 py-3">
                <div className="d-flex text-center">
                  <div className="flex-grow-1 mb-3">
                    <div className="text-nowrap text-100 text-dark-l2">
                      ترافیک زماندار
                      <br />
                      <small className="position-bc  pb-2 pt-4">
                        <i className="far fa-clock"></i>
                        {localizeNumbers(timedTraffic.remindDays)} روز
                      </small>
                    </div>
                  </div>
                </div>
                <div className="align-self-center pos-rel text-success-l2">
                  <Doughnut data={data[2]} options={options} />
                  <span className="position-center text-600 text-110 text-dark-tp4">
                    {localizeNumbers(Math.round(timedTraffic.remind))} گیگ
                  </span>
                </div>
              </div>
            </SplideSlide>
          )}
          <SplideSlide />
        </Splide>
      </Card>
    </Col>
  );
}

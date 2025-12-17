import React from "react";
import { motion } from "framer-motion";
import "./chart.css";

const data = [
  { year: "2020", vagas: 98000, label: "98k" },
  { year: "2021", vagas: 135000, label: "135k" },
  { year: "2022", vagas: 148000, label: "148k" },
  { year: "2023", vagas: 162000, label: "162k" },
  { year: "2024", vagas: 175000, label: "175k" },
];

const Chart = () => {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>
          <span className="arrow-up">▲</span> Contratações por ano.
        </h3>
        <p className="chart-subtitle">Fonte: CAGED</p>
      </div>

      <div className="bars-area">
        {data.map((item, index) => {
          const heightPercentage = (item.vagas / 180000) * 100;

          return (
            <div key={index} className="bar-wrapper">
              <div
                className="bar-bg"
                style={{
                  height: `${heightPercentage}%`,
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <span className="bar-value">{item.label}</span>

                <motion.div
                  className="bar-fill"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  style={{
                    transformOrigin: "bottom",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div className="bar-shine" />
                </motion.div>
              </div>

              <span className="bar-year">{item.year}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chart;

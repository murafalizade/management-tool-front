import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableLayout from "./TableLayout";

export default function Departments() {
  return (
    <Container>
      <Row>
        <Col md={2}>
          <TableLayout
            columns={[
              {
                title: "S№",
                field: "id",
              },
              {
                title: "İdarə",
                field: "organizationName",
              },
            ]}
            data={[
              {
                id: 1,
                organizationName: "Q1 Şəxsi heyət",
              },
            ]}
            isEditable={false}
          />
        </Col>

        <Col md={9}>
          <TableLayout
            isEditable={true}
            data={[
              {
                id: 1,
                departmentName: "Şəxsi heyət baş idarəsi(Q1)",
              },
            ]}
            columns={[
              {
                title: "S№",
                field: "id",
              },
              {
                title: "Şöbə və Bölmələr",
                field: "departmentName",
              },
            ]}
          />

          <TableLayout
            isEditable={true}
            data={[
              {
                id: 1,
                PositionName: "MN m-ni- ŞHBİR-si",
                rank: "g-l t-l",
                till_month: "",
                till_year: "",
              },
            ]}
            columns={[
              {
                title: "S№",
                field: "id",
              },
              {
                title: "Vəzifələr",
                field: "PositionName",
              },

              { title: "Hərbi rütbə", field: "rank" },
              {
                title: "Ayadək",

                field: "till_month",
              },
              {
                title: "İlədək",

                field: "till year",
              },
            ]}
          />

          <TableLayout
            isEditable={false}
            data={[]}
            columns={[
              {
                title: "İl",
                field: "year",
              },
              {
                title: "Ay",
                field: "months",
              },

              {
                title: "Soyadı",
                field: "surname",
              },
              { title: "Adı", field: "name" },
              {
                field: "fatherName",
                title: "Atasının adı",
              },
              {
                title: "HA_ID",

                field: "HA_ID",
              },
              {
                title: "H_ID",

                field: "H_ID",
              },
              {
                title: "VZF_ID",

                field: "VZF_ID",
              },
            ]}
          />
        </Col>
      </Row>
    </Container>
  );
}

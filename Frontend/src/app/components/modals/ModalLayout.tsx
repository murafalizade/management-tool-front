import React, { useEffect, useState } from "react";
import { Modal, Nav, Tab } from "react-bootstrap";

interface ModalLayoutProps {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
  title: string;
  size?: "sm" | "lg" | "xl" | undefined;
}

const ModalLayout = (props: ModalLayoutProps) => {
  return (
    <Modal size={props.size} show={props.show} onHide={() => props.onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default ModalLayout;

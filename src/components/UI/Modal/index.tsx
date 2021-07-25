import { createPortal } from "react-dom";
import styled from "styled-components";

const BackdropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const ModalOverlayContainer = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;

  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Backdrop = ({ onClose }: { onClose: () => void }) => {
  return <BackdropContainer onClick={onClose} />;
};

const ModalOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalOverlayContainer>
      <div className="content">{children}</div>
    </ModalOverlayContainer>
  );
};

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const portalElement = document.getElementById("overlays")!;

export const Modal = (props: ModalProps) => {
  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

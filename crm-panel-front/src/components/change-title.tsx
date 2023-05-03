import * as React from "react";
import { Button, Col, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export interface IChangeTitleProps {
  show: boolean;
  onEdit: (newTitle: string) => void;
  onCancel: () => void;
  title: string;
  comment: string;
}

interface RequestForm {
  comment: string;
}

export default function ChangeTitle({
  show,
  onEdit,
  onCancel,
  title,
  comment,
}: IChangeTitleProps) {
  const { register, handleSubmit } = useForm<RequestForm>();

  return (
    <Modal
      show={show}
      onHide={onCancel}
      style={{ paddingRight: "17px", display: "block" }}
      centered
    >
      <Modal.Header className="border-0">
        <Modal.Title>{`تغییر عنوان ${title || ""}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body text-center py-0">
        <form
          autoComplete="off"
          className="form-row mt-45"
          onSubmit={handleSubmit(({ comment }) => {
            onEdit(comment);
            console.log("here");
          })}
        >
          <div className="form-group col-12 mb-3">
            <div className="d-flex align-items-center input-floating-label text-blue-m1 brc-blue-m2">
              <input
                {...register("comment")}
                placeholder="عنوان"
                type="text"
                className="form-control pr-4 shadow-none radius-1"
              />
              <label
                className="floating-label text-grey-l1 text-95 ml-n3"
                htmlFor="comment"
              >
                عنوان
              </label>
            </div>
          </div>
          <Col className="form-group">
            <Button type="submit" size="sm" variant="primary" block>
              اعمال
            </Button>
          </Col>
          <Col className="form-group">
            <Button size="sm" variant="danger" block onClick={onCancel}>
              لغو
            </Button>
          </Col>
        </form>
      </Modal.Body>
    </Modal>
  );
}

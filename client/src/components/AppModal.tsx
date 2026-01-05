type Props = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  hideCancel?: boolean;
};

export default function AppModal({
  open,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "OK",
  hideCancel = false,  
}: Props) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: "1.5rem",
          width: "min(300px, 90%)",
          boxShadow:
            "0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <p>{message}</p>

        <div
          style={{
            marginTop: "1.2rem",
            display: "flex",
            justifyContent: "center",
            gap: "0.6rem",
          }}
        >
          {!hideCancel && (
            <button
              onClick={onClose}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid #ccc",
                background: "#f5f5f5",

              }}
            >
              Cancel
            </button>
          )}

          <button
            onClick={onConfirm ?? onClose}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "none",
              background: "#942d0e",
              color: "white",
              fontWeight: 600,
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

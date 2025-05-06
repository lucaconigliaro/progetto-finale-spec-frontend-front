export default function FavoritesSidebar({ isOpen, onClose }) {
    return (
        <div>
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1040 }}
                    onClick={onClose}
                />
            )}

            <div
                className={`offcanvas bg-dark text-white offcanvas-end ${isOpen ? 'show' : ''}`}
                style={{
                    visibility: isOpen ? 'visible' : 'hidden',
                    backgroundColor: '#fff',
                    zIndex: 1045,
                    position: 'fixed',
                    top: '56px',
                    height: 'calc(100% - 56px)',
                    transition: 'transform 0.3s ease-in-out',
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    width: '300px'
                }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Preferiti</h5>
                    <button type="button" className="btn-close bg-danger" onClick={onClose}></button>
                </div>
                <div className="offcanvas-body">
                </div>
            </div>
        </div>
    );
};
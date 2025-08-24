import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Video, FileText, Presentation } from 'lucide-react';

export const AddContentModal = ({ isOpen, onClose, courseId }) => {
  const handleUpload = (type: 'VIDEO' | 'PPT' | 'NOTES') => {
    // Open the file upload modal here and pass the type
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Content">
      <div className="flex justify-around">
        <Button onClick={() => handleUpload('VIDEO')}>
          <Video className="mr-2 h-4 w-4" />
          Video
        </Button>
        <Button onClick={() => handleUpload('PPT')}>
          <Presentation className="mr-2 h-4 w-4" />
          PPT
        </Button>
        <Button onClick={() => handleUpload('NOTES')}>
          <FileText className="mr-2 h-4 w-4" />
          Notes
        </Button>
      </div>
    </Modal>
  );
};
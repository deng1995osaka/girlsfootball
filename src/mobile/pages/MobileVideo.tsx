import React from 'react';
import {
  Container,
  Title,
  VideoWrapper,
  Description
} from './MobileVideo.styles';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const MobileVideo: React.FC = () => {
  return (
    <Container>

      <VideoWrapper>
        <VideoPlayer title="女孩踢球" />
      </VideoWrapper>

    </Container>
  );
};

export default MobileVideo;
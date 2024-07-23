import { useCallback } from 'react'
import * as FileSystem from 'expo-file-system';

export default function useVideoManager() {

  const saveVideoToFileSystem = useCallback(async (videoUri: string, title: string) => {
    try {
      const videoName = title.replace(/\s/g, '_')+Date.now()+'.mp4';
      const videoPath = FileSystem.documentDirectory + videoName;
      await FileSystem.copyAsync({
        from: videoUri,
        to: videoPath,
      });
      return videoPath;
    } catch (error) {
      console.error('Error saving base64 to file:', error);
      return null;
    }
  }, []);

  const deleteVideoFromFileSystem = useCallback(async (videoUri: string) => {
    try {
      await FileSystem.deleteAsync(videoUri, { idempotent: true });
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  }, []);

  return {saveVideoToFileSystem, deleteVideoFromFileSystem}
}
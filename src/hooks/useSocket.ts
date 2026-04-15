import { useEffect } from 'react';
import { socket, connectSocket, disconnectSocket } from '@/lib/socket';
import { useQueryClient } from '@tanstack/react-query';

export const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    connectSocket();

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('scoreUpdate', (data) => {
      console.log('Score update received:', data);
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['admin-matches'] });
      queryClient.invalidateQueries({ queryKey: ['live-scores'] });
      queryClient.invalidateQueries({ queryKey: ['hero-matches'] });
      queryClient.invalidateQueries({ queryKey: ['match'] });
    });

    socket.on('ballUpdate', (data) => {
        console.log('Ball update received:', data);
        queryClient.invalidateQueries({ queryKey: ['match', data.matchId] });
    });

    return () => {
      socket.off('connect');
      socket.off('scoreUpdate');
      socket.off('ballUpdate');
    };
  }, [queryClient]);
};

import React from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
export default function QuestionList() {
    const postsQuery = useQuery({
        queryKey: ['posts'],
        queryFn: () => {},
    });
    return <>질문게시판</>;
}

interface ICommentProps {
    userId: string;
    body: string;
}

export interface IBlogsProps {
    _id: string,
    body: string,
    label: string,
    subLabel: string,
    comment: [ICommentProps],
}
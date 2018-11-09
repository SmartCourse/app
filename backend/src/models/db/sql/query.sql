/* Join comment and user tables */
 SELECT
        u.id as userID,
        u.displayName,
        u.degree,
        u.gradYear,
        u.description,
        u.picture,
        u.reputation,
        u.joined,
        c.id,
        c.questionID,
        c.reviewID,
        c.commentParent,
        c.body,
        c.timestamp  
    FROM
        comment as c  
    JOIN
        user as u 
            on (
                c.userID=u.id
            )  
    WHERE
        (
            c.questionID=1
        ) ;

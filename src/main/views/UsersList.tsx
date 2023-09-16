import {sql} from "drizzle-orm";
import {User, users} from "../../../db/schema";
import {BaseHtml} from "../layouts/BaseHtml";
import {db} from "../../../db";

export const UsersList = async () => {
    const usersQuery = await db.execute(sql`select * from ${users}`);
    const usersArr: User[] = usersQuery.rows;
    return BaseHtml(
        <div>
            {usersArr.map((user) => (
                <li>{user.name}</li>
            ))}
        </div>
    );
}
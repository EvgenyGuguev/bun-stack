import {sql} from "drizzle-orm";
import {User, users} from "../../../db/schema";
import {BaseHtml} from "../layouts/BaseHtml";
import {NodePgDatabase} from "drizzle-orm/node-postgres";

export const UsersList = async (db: NodePgDatabase) => {
    const usersQuery = await db.execute(sql`select * from ${users}`);
    const usersArr: User[] = usersQuery.rows;
    return BaseHtml(
        <div>
            {usersArr.map((user) => (
                <li>{user.name}</li>
            ))}
        </div>
    );
};
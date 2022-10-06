import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
    //return res.status(403).json({ ok: false, message: "Permission denied" });
    const users = readUsersDB();
    const userN = users.filter((x) => x.isAdmin === false);
    const adminN = users.filter((x) => x.isAdmin === true);
    const totalMoney = [0, 0];
    for (totalMoney[1] = 0; totalMoney[1] < userN.length; totalMoney[1]++) {
      totalMoney[0] += userN[totalMoney[1]].money;
    }
    //compute DB summary
    //return response
    return res.json({
      ok: true,
      userCount: userN.length,
      adminCount: adminN.length,
      totalMoney: totalMoney[0],
    });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}

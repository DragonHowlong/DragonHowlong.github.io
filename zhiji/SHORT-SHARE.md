# 短分享（短文案 + 短链）说明

## 现状（改前）
- 主按钮「复制邀请链接」把整卷压缩进 `?q=`，剪贴板只有一条超长 URL。
- 题库卷约 500–800 字符；自定义题常见 1000–2000+，微信转发易被拦或对方懒得点开。
- 默认二维码也是压缩长链，扫码虽立刻可答，但码点更密、难扫。

## 本 PR 前端方案（不部署 Worker）
1. 主按钮「复制邀请（短文案+短链）」：
   - 文案：`来测测你有多懂我～`
   - 链接：`…/zhiji/?s=<quizId>`（约 55 字符）
   - 合计理想 &lt;100 字；**整卷不进剪贴板**。
2. **默认二维码也走 `?s=` 短链**（与复制一致）；「更多 → 切换二维码」可改回压缩长链。
3. 「更多 → 复制压缩长链 ?q=（立刻可用）」——不依赖短码库，打开即答题。
4. 打开 `?s=` 时：先读 `./s/<id>.json`，再尝试 `GET /zhiji/quiz?id=`（Worker 短码库，**尚未部署**）。
5. 出卷时：
   - best-effort `POST /zhiji/quiz`（无路由则静默失败）
   - **自动下载** `s/<id>.json`，放到仓库 `zhiji/s/` 并随站点发布后短链才生效
6. UI 提示：「短链需随站点发布后生效；发布前可用更多→压缩长链」。
7. `encodeQuiz` 略作瘦身（省略空昵称 / null 库存）。

## 仓库内示例 / 测试卷
| id | 文件 | 短链 |
|----|------|------|
| `mvxns9jydpa1bu` | `zhiji/s/mvxns9jydpa1bu.json` | `?s=mvxns9jydpa1bu` |
| `demoshortshare1` | `zhiji/s/demoshortshare1.json` | `?s=demoshortshare1` |

## 未完成（真正短链）
现网 Worker（`zhiji-board.wanghowlonggg.workers.dev` / KV）**没有**试卷短码读写接口（已探测 `/zhiji/quiz` → 404）。  
在**不部署 Worker**的约束下，新出的卷 `?s=` 只有在把 `s/<id>.json` 提交并上线 GitHub Pages 后才可打开。

要让「人人复制都是短链且立刻可答」，需要后续单独部署例如：
- `POST /zhiji/quiz`：写入 KV（key=`quiz:<id>`，value=试卷 JSON）
- `GET /zhiji/quiz?id=`：读出试卷  
前端本 PR 已预留调用，部署后即可衔上。**仍需用户批准后才能部署 Worker。**

## 本地自测短文案示例
```
来测测你有多懂我～
https://dragonhowlong.github.io/zhiji/?s=demoshortshare1
```
（约 66 字；示例卷 JSON 已在仓库 `zhiji/s/demoshortshare1.json`。）

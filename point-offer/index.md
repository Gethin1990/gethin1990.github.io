# 剑指Offer（python）


### 数组与矩阵

- 3. 数组中重复的数字

``` python
class Solution:
    def findRepeatNumber(self, nums: List[int]) -> int:
        dic ={}
        for num in nums:
            if num not in dic:
                dic[num] = True
            else:
                return num
```

- 4. 二维数组中的查找

``` python
class Solution:
    def findNumberIn2DArray(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]:return False
        col = len(matrix)-1
        row = len(matrix[0])-1
        _i,_j = col, 0
        while _i>=0 and _j<=row:
            if matrix[_i][_j]>target:_i-=1
            elif matrix[_i][_j]<target:_j+=1
            else: return True
        return False
```

- 5. 替换空格

``` python
class Solution:
    def replaceSpace(self, s: str) -> str:
        ans =[]
        for c in s:
            if c == " ":
                ans.append('%20')
            else:   
                ans.append(c)
        return "".join(ans)
```

- 29. 顺时针打印矩阵

``` python
class Solution:
    def spiralOrder(self, matrix:[[int]]) -> [int]:
        if not matrix: return []
        l, r, t, b, res = 0, len(matrix[0]) - 1, 0, len(matrix) - 1, []
        while True:
            for i in range(l, r + 1): res.append(matrix[t][i]) # left to right
            t += 1
            if t > b: break
            for i in range(t, b + 1): res.append(matrix[i][r]) # top to bottom
            r -= 1
            if l > r: break
            for i in range(r, l - 1, -1): res.append(matrix[b][i]) # right to left
            b -= 1
            if t > b: break
            for i in range(b, t - 1, -1): res.append(matrix[i][l]) # bottom to top
            l += 1
            if l > r: break
        return res
```

- 50. 第一个只出现一次的字符位置

``` python
class Solution:
    def firstUniqChar(self, s: str) -> str:
        dic = {}
        for c in s:
            if c in dic:
                dic[c] = False
            else:
                dic[c] = True
        for c,v in dic.items():
            if dic[c]:return c
        return " "
```

### 栈队列堆

- 9. 用两个栈实现队列

``` python
class CQueue:

    def __init__(self):
        self.l1 = []
        self.l2 = []


    def appendTail(self, value: int) -> None:
        self.l1.append(value)


    def deleteHead(self) -> int:
        if self.l2: return self.l2.pop()
        if not self.l1: return -1
        while self.l1:
            self.l2.append(self.l1.pop())
        return self.l2.pop()
```

- 30. 包含 min 函数的栈

``` python
class MinStack:

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.stack = []
        self.minstack = []

    def push(self, x: int) -> None:
        self.stack.append(x)
        if not self.minstack or x<=self.minstack[-1]:
            self.minstack.append(x)


    def pop(self) -> None:
        if self.stack.pop() ==self.minstack[-1]:
            self.minstack.pop()


    def top(self) -> int:
        return self.stack[-1]

    def min(self) -> int:
        return self.minstack[-1]

```

- 31. 栈的压入、弹出序列

``` python
class Solution:
    def validateStackSequences(self, pushed: List[int], popped: List[int]) -> bool:
        stack =[]
        _i =0
        for num in pushed:
            stack.append(num)
            while stack and stack[-1]==popped[_i]:# 循环栈
                stack.pop()
                _i+=1
        return not stack
```

- 40. 最小的 K 个数

``` python
class Solution:
    def getLeastNumbers(self, arr: List[int], k: int) -> List[int]:
        def sort(arr):
            if len(arr)<2:
                return arr
            else:
                pivot = arr[0]
                less = [i for i in arr[1:] if i<=pivot]
                more = [i for i in arr[1:] if i> pivot]
                return sort(less) +[pivot]+ sort(more)
        r =sort(arr)
        return r[:k]
```

- 41.1 数据流中的中位数

``` python
from heapq import *

class MedianFinder:
    def __init__(self):
        self.A = [] # 小顶堆，保存较大的一半
        self.B = [] # 大顶堆，保存较小的一半

    def addNum(self, num: int) -> None:
        if len(self.A) != len(self.B):
            heappush(self.A, num)
            heappush(self.B, -heappop(self.A))
        else:
            heappush(self.B, -num)
            heappush(self.A, -heappop(self.B))

    def findMedian(self) -> float:
        return self.A[0] if len(self.A) != len(self.B) else (self.A[0] - self.B[0]) / 2.0

```

- 41.2 字符流中第一个不重复的字符

``` python
```

- 59. 滑动窗口的最大值

``` python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        deque = collections.deque()
        res, n = [], len(nums)
        for i, j in zip(range(1 - k, n + 1 - k), range(n)):
            # 删除 deque 中对应的 nums[i-1]
            if i > 0 and deque[0] == nums[i - 1]:
                deque.popleft()
            # 保持 deque 递减
            while deque and deque[-1] < nums[j]:
                deque.pop()
            deque.append(nums[j])
            # 记录窗口最大值
            if i >= 0:
                res.append(deque[0])
        return res
```

### 双指针

- 57.1 和为 S 的两个数字

``` python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # 2 points
        _i,_j =0,len(nums)-1
        # slide point _i,_j
        while _i<_j:
            s = nums[_i]+nums[_j]
            if s>target: _j-=1
            elif s< target: _i+=1
            else:return[nums[_i],nums[_j]]
        return []
```

- 57.2 和为 S 的连续正数序列

``` python
class Solution:
    def findContinuousSequence(self, target: int) -> List[List[int]]:
        _i,_j,s = 1,2,3
        ans = []
        while _i<_j:
            if s ==target:
                #ans.append(list(range(i, j + 1)))
                ans.append([i for i in range(_i,_j+1)])
            if s>=target:
                s-=_i
                _i+=1
            else:
                _j+=1
                s+=_j
        return ans
```

- 58.1 翻转单词顺序列

``` python
class Solution:
    def reverseWords(self, s: str) -> str:
        s = s.strip() # 删除首尾空格
        _i=_j = len(s)-1
        ans = []
        # 退出条件
        while _i>=0:
            # 添加单词
            # 向左移动指针
            while _i>=0 and s[_i]!=' ': _i-=1
            ans.append(s[_i+1:_j+1])
            # _i,_j 指针再次初始化 & 跳过 ' '
            while s[_i] == ' ': _i-=1
            _j =_i
        return " ".join(ans)


        # strs = s.split()
        # re_str = strs[::-1]
        # return " ".join(re_str)
```

- 58.2 左旋转字符串

``` python
class Solution:
    def reverseLeftWords(self, s: str, n: int) -> str:
        return s[n:]+s[:n]
```

### 链表

- 6. 从尾到头打印链表

``` python
class Solution:
    def reversePrint(self, head: ListNode) -> List[int]:
        ans =[]
        def dfs(cur):
            if not cur: return
            dfs(cur.next)
            ans.append(cur.val)
        dfs(head)
        return ans
```

- 18.1 在 O(1) 时间内删除链表节点

``` python
class Solution:
    def deleteNode(self, head: ListNode, val: int) -> ListNode:
        def dfs(node):
            if not node:
                return node
            node.next = dfs(node.next)
            if node.val == val:
                return node.next
            return node
        return dfs(head)
```

- 18.2 删除链表中重复的结点

``` python
```

- 22. 链表中倒数第 K 个结点

``` python
class Solution:
    def getKthFromEnd(self, head: ListNode, k: int) -> ListNode:
        i =0
        def dfs(cur):
            if not cur:
                return cur
            o = dfs(cur.next)
            nonlocal i
            i+=1
            # cur always regression, when k, return cur as o
            if i ==k: return cur
            return o
        return dfs(head)
```

- 23. 链表中环的入口结点

``` python

```

- 24. 反转链表

``` python

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        def dfs(cur):
            if not cur or not cur.next:
                return cur 
            o =dfs(cur.next)
            cur.next.next = cur
            cur.next = None
            return o
        return dfs(head)
```

- 25. 合并两个排序的链表

``` python
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        # if l1 is null return l2
        if not l1:
            return l2
        if not l2:
            return l1
        # ex. 1,2,3 | 1,3,4
        # recurrence (push)
        if l1.val <= l2.val:
            o = self.mergeTwoLists(l1.next,l2)
            #regression (pop) l1.next = o(if l1 is none:l2)
            l1.next = o
            return l1
        else:
            o = self.mergeTwoLists(l1,l2.next)
            l2.next = o
            return l2
```

- 35. 复杂链表的复制

``` python
class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        # use dic to build and copy linklist
        if not head: return None
        dic ={}
        _cur = head
        while _cur:
            dic[_cur] = Node(_cur.val)
            _cur = _cur.next
        _cur = head
        while _cur:
            dic[_cur].next = dic.get(_cur.next)
            dic[_cur].random = dic.get(_cur.random)
            _cur = _cur.next
        return dic[head]
```

- 52. 两个链表的第一个公共结点

``` python
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        A,B = headA,headB
        while A!=B:
            A = A.next if A else headB
            B = B.next if B else headA
        return A
```

### 树

- 7. 重建二叉树

``` python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        # 0
        if len(preorder)==0 or len(inorder)==0:
            return None
        # 1 build root
        r_val = preorder[0]
        root = TreeNode(r_val)
        # find index
        idx = inorder.index(r_val)
        # build left & right based on b-tree attribute
        root.left = self.buildTree(preorder[1:1+idx],inorder[:idx])
        root.right = self.buildTree(preorder[1+idx:],inorder[idx+1:])
        return root
```

- 8. 二叉树的下一个结点

``` python
```

- 26. 树的子结构

``` python
class Solution:
    def isSubStructure(self, A: TreeNode, B: TreeNode) -> bool:
        if not A or not B:return False
    
        def dfs(A,B):
            if not B:return True
            if not A:return False
            o_l = dfs(A.left,B.left)
            o_r = dfs(A.right,B.right)
            return A.val==B.val and o_l and o_r
        
        return dfs(A,B) or self.isSubStructure(A.left,B) or self.isSubStructure(A.right,B)
```

- 27. 二叉树的镜像

``` python
class Solution:
    def mirrorTree(self, root: TreeNode) -> TreeNode:
        def dfs(node):
            if node is None:
                return node
            o_l =dfs(node.left)
            o_r =dfs(node.right)
            node.left = o_r
            node.right = o_l
            return node
        return dfs(root)
```

- 28. 对称的二叉树

``` python
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        def dfs(left,right):
            if left is None and right is None: # 1. 
                return True
            if left is None or right is None or left.val != right.val:
                return False
            return dfs(left.left, right.right) and dfs(left.right, right.left)

        return dfs(root.left, root.right) if root else True
```

- 32.1 从上往下打印二叉树

``` python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[int]:
        if not root:return []
        q,ans = [root],[]
        while q:
            node = q.pop(0)
            ans.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        return ans
```

- 32.2 把二叉树打印成多行

``` python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:return []
        q =[root]
        ans =[]
        while q:
            tmp =[]
            for _ in range(len(q)):
                node = q.pop(0)
                tmp.append(node.val)
                if node.left:q.append(node.left)
                if node.right:q.append(node.right)
            ans.append(tmp)
        return ans
```

- 32.3 按之字形顺序打印二叉树

``` python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:return[]
        i,q,ans = 0,[root],[]
        while q:
            tmp = []
            i+=1
            for _ in range(len(q)):
                node = q.pop(0)
                tmp.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            if i%2 ==0: ans.append(list(reversed(tmp)))
            else:ans.append(tmp)
        return ans
```

- 33. 二叉搜索树的后序遍历序列

``` python
class Solution:
    def verifyPostorder(self, postorder: List[int]) -> bool:
        # root right left 单调栈        
        stack,root=[],float('inf')

        #二叉搜索树: root<right & root>left
        for num in reversed(postorder): 
            if root < num: return False

            while stack and stack[-1]>num:
                root = stack.pop()
            # root
            stack.append(num)
        return True
```

- 34. 二叉树中和为某一值的路径

``` python
class Solution:
    def pathSum(self, root: TreeNode, target: int) -> List[List[int]]:
        # def res,path
        res = []
        path =[]
        # 1.root left right
        def dfs(cur,tar):
            if not cur:return
            path.append(cur.val)
            tar -= cur.val
            if tar == 0 and not cur.left and not cur.right:
                res.append(list(path))
            dfs(cur.left,tar)
            dfs(cur.right,tar)
            path.pop()
       
        dfs(root,target)
        return res
```

- 36. 二叉搜索树与双向链表

``` python
class Solution:
    def treeToDoublyList(self, root: 'Node') -> 'Node':
        if not root:return
        def dfs(cur):
            if not cur:
                return
            dfs(cur.left)
            if not self.pre:
                self.head = cur # head
            else:
                self.pre.right =cur
                cur.left = self.pre
            self.pre = cur
            dfs(cur.right)
        self.pre = None
        self.head = None
        dfs(root)
        self.head.left = self.pre
        self.pre.right = self.head
        return self.head
```

- 37. 序列化二叉树

``` python
class Codec:
    def serialize(self, root):
        if not root: return "[]"
        queue = collections.deque()
        queue.append(root)
        res = []
        while queue:
            node = queue.popleft()
            if node:
                res.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
            else: res.append("null")
        return '[' + ','.join(res) + ']'

    def deserialize(self, data):
        if data == "[]": return
        vals, i = data[1:-1].split(','), 1
        root = TreeNode(int(vals[0]))
        queue = collections.deque()
        queue.append(root)
        while queue:
            node = queue.popleft()
            if vals[i] != "null":
                node.left = TreeNode(int(vals[i]))
                queue.append(node.left)
            i += 1
            if vals[i] != "null":
                node.right = TreeNode(int(vals[i]))
                queue.append(node.right)
            i += 1
        return root
```

- 54. 二叉查找树的第 K 个结点

``` python
class Solution:
    def kthLargest(self, root: TreeNode, k: int) -> int:
        i,r= 0,0
        def dfs(node):
            if node is None:
                return
            dfs(node.right)
            nonlocal i
            nonlocal r
            i+=1
            if i ==k: r = node.val
            dfs(node.left)
        dfs(root)
        return r
```

- 55.1 二叉树的深度

``` python
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        def dfs(node):
            if node is None:
                return 0 # deep
            o_l =dfs(node.left)
            o_r =dfs(node.right)
            deep = max(o_l,o_r)+1
            return deep
        return dfs(root)
```

- 55.2 平衡二叉树

``` python
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        def dfs(node):
            if node is None:
                return 0
            # value==-1 return -1
            o_l = dfs(node.left)
            if o_l == -1:return -1
            o_r = dfs(node.right)
            if o_r ==-1:return -1
            result = max(o_l,o_r)+1 if abs(o_l - o_r)<=1 else -1
            return result
        r =dfs(root)
        return r!=-1
```

- 68. 树中两个节点的最低公共祖先

``` python
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        def dfs(node,p,q):
            if node.val > p.val and node.val > q.val:
                return dfs(node.left, p, q)
            if node.val < p.val and node.val < q.val:
                return dfs(node.right, p, q)
            return node
        return dfs(root,p,q)
```

### 贪心思想

- 14. 剪绳子

``` python
class Solution:
    def cuttingRope(self, n: int) -> int:
        dp =[0]*(n+1)
        max_tmp =0
        dp[2] =1 
        for i in range(2,n+1):
            for j in range(1,i):
                max_tmp = max((i-j)*j,dp[i-j]*j)
                dp[i]=max(dp[i],max_tmp)
        return dp[-1]
```

- 63. 股票的最大利润

``` python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_profit = float('inf')
        max_profit = 0
        for day_price in prices:
            min_profit = min(day_price,min_profit)
            max_profit = max(day_price-min_profit,max_profit)
        return max_profit
```

### 二分查找

- 11. 旋转数组的最小数字

``` python
class Solution:
    def minArray(self, numbers: List[int]) -> int:
        l,r =0,len(numbers)-1
        while l<=r:
            mid = (l+r)//2
            if numbers[mid]>numbers[r]:
                l=mid+1
            elif numbers[mid]<numbers[r]:
                r =mid
            else:
                r-=1
        return numbers[l]
```

- 53. 数字在排序数组中出现的次数

``` python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        
        def find_r(nums,target)->int:
            _l,_r = 0,len(nums)-1
            while _l<=_r:
                m = (_l+_r)//2
                if nums[m] <= target:
                    _l = m+1
                else:
                    _r = m-1
            return _l
        r = find_r(nums,target)
        r_pre = find_r(nums,target-1)
        return  r - r_pre 
```

### 分治

- 16. 数值的整数次方

``` python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n == 0: 
            return 1
        elif n < 0: # 1/x^{-n}
            return 1/self.myPow(x, -n)
        elif n & 1: # odd: x∗x^(n−1)
            return x * self.myPow(x, n - 1)
        else: # even x^2*(n/2)
            return self.myPow(x*x, n // 2)
```

### 搜索

- 12. 矩阵中的路径

``` python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        # S0:check None
        if not board or not board[0]:return False
        row  =len(board)
        col  = len(board[0])
        # S1:def dfs and backtracking
        def dfs(_i,_j,k):
            if not (0<=_i<row) or not (0<=_j<col) or board[_i][_j]!=word[k]: return False
            # S2: True condition
            if k == len(word)-1:return True
            # S1
            board[_i][_j] =''
            res = dfs(_i + 1, _j, k + 1) or dfs(_i - 1, _j, k + 1) or dfs(_i, _j + 1, k + 1) or dfs(_i, _j - 1, k + 1)
            # S1
            board[_i][_j]=word[k]
            return res
        
        # S4 for to call dfs
        for _i in range(row):
            for _j in range(col):
                if dfs(_i,_j,0):return True
        return False
```

- 13. 机器人的运动范围

``` python
class Solution:
    def movingCount(self, m: int, n: int, k: int) -> int:
        visited = [[False]*n for _ in range(m)]
        self.res = 0
        def dfs(i, j):
            if not (0<=i<m) or not (0<=j<n) or visited[i][j] or (i//10+i%10+j//10+j%10>k):
                return
            visited[i][j] = True
            self.res += 1
            dfs(i+1, j)
            dfs(i-1, j)
            dfs(i, j+1)
            dfs(i, j-1)
            #visited[i][j] = False
        dfs(0, 0)
        return self.res
```

- 38. 字符串的排列

``` python
class Solution:
    def permutation(self, s: str) -> List[str]:
        c, res = list(s), []
        def dfs(x):
            if x == len(c) - 1:
                res.append(''.join(c))   # 添加排列方案
                return
            dic = set()
            for i in range(x, len(c)):
                if c[i] in dic: continue # 重复，因此剪枝
                dic.add(c[i])
                c[i], c[x] = c[x], c[i]  # 交换，将 c[i] 固定在第 x 位
                dfs(x + 1)               # 开启固定第 x + 1 位字符
                c[i], c[x] = c[x], c[i]  # 恢复交换
        dfs(0)
        return res
```

### 排序

- 21. 调整数组顺序使奇数位于偶数前面

``` python
class Solution:
    def exchange(self, nums: List[int]) -> List[int]:
        #2 points
        _i,_j = 0,len(nums)-1
        while _i<_j:
            #_i+=1
            while _i<_j and nums[_i]%2 == 1:_i+=1
            #_j-=1
            while _i<_j and nums[_j]%2 == 0:_j-=1
            #swap
            nums[_i],nums[_j] = nums[_j],nums[_i]
        return nums
```

- 45. 把数组排成最小的数

``` python
class Solution:
    def minNumber(self, nums: List[int]) -> str:
        def quick_sort(l , r):
            if l >= r: return
            # left & right point
            i, j = l, r
            while i < j:
                while strs[j] + strs[l] >= strs[l] + strs[j] and i < j: j -= 1
                while strs[i] + strs[l] <= strs[l] + strs[i] and i < j: i += 1
                strs[i], strs[j] = strs[j], strs[i]
            strs[i], strs[l] = strs[l], strs[i]
            quick_sort(l, i - 1)
            quick_sort(i + 1, r)
        
        strs = [str(num) for num in nums]
        quick_sort(0, len(strs) - 1)
        return ''.join(strs)
```

- 51. 数组中的逆序对

``` python
class Solution:
    def reversePairs(self, nums: List[int]) -> int:
        def merge_sort(l, r):
            # 终止条件
            if l >= r: return 0
            # 递归划分
            m = (l + r) // 2
            res = merge_sort(l, m) + merge_sort(m + 1, r)
            # 合并阶段
            i, j = l, m + 1
            tmp[l:r + 1] = nums[l:r + 1]
            for k in range(l, r + 1):
                if i == m + 1:
                    nums[k] = tmp[j]
                    j += 1
                elif j == r + 1 or tmp[i] <= tmp[j]:
                    nums[k] = tmp[i]
                    i += 1
                else:
                    nums[k] = tmp[j]
                    j += 1
                    res += m - i + 1 # 统计逆序对
            return res
        
        tmp = [0] * len(nums)
        return merge_sort(0, len(nums) - 1)
```

### 动态规划

- 10.1 斐波那契数列

``` python
class Solution:
    def fib(self, n: int) -> int:
        #S0: 
        if n==0:return 0
        if n==1:return 1
        #S1: Def dp is line or matrix and identify parameter 
        #S3: Init dp
        dp = [0] * (n+1)

        dp[0]=0
        dp[1]=1
        # S4: Decide loop wany
        for _i in range(2,n+1):
            # S2: Recurrence Formula
            dp[_i] = dp[_i-1]+dp[_i-2]
        return dp[-1] % 1000000007
```

- 10.2 矩形覆盖

``` python
```

- 10.3 跳台阶

``` python
class Solution:
    def numWays(self, n: int) -> int:
        dp = [1,1]
        # 1,1,2,3,5
        for i in range(2,n+1):
           dp.append(dp[i-1]+dp[i-2])
        return dp[-1] % 1000000007
```

- 10.4 变态跳台阶

``` python
```

- 42. 连续子数组的最大和

``` python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # use dp
        # 1.def dp and def n means
        n = len(nums)
        # 3.init dp
        dp = [0] * n
        # 4.decide loop
        for _i in range(n):
            # 2.Recurrence Formula
            if dp[_i-1]>0: dp[_i] = dp[_i-1]+nums[_i]
            else:dp[_i] = nums[_i]
        # 5.decide return
        return max(dp)
```

- 47. 礼物的最大价值

``` python
class Solution:
    def maxValue(self, grid: list[list[int]]) -> int:
        # DP
        if not grid or not grid[0]:return 0
        #print(grid)
        # 1.def dp
        row = len(grid)
        col = len(grid[0])
        dp=[[0]*col for _ in range(row)]
        
        # 3.init dp
        dp[0][0] =grid[0][0]
        for _i in range(1,row):
            dp[_i][0] = dp[_i-1][0]+grid[_i][0]
        for _j in range(1,col):
            dp[0][_j] = dp[0][_j-1]+grid[0][_j]
        #print(dp)
        # 4.decide loop
        for _i in range(1,row):
            for _j in range(1,col):
                # 2.recurrence formula
                dp[_i][_j] = max(dp[_i-1][_j]+grid[_i][_j],dp[_i][_j-1]+grid[_i][_j])
        #print(dp)
        # 5. decide return
        return dp[-1][-1]

```

- 48. 最长不含重复字符的子字符串

``` python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        if not s:return 0
        dic ={}
        #1.def dp [] and i means
        ans = 1
        n = len(s)
        dp=[0]*n
        #3.init dp
        dp[0] = 1
        dic[s[0]]=0 # init dic
        #4.def loop
        for _i in range(1,n):
        #2.recurrence formula
            if s[_i] not in dic: # char not repeat
                dp[_i] = dp[_i-1]+1
            else:
                _repeat = dic[s[_i]] #char repeat then compare pre,cur interval
                cur_interval = _i-_repeat
                dp[_i] = dp[_i-1]+1 if cur_interval>dp[_i-1] else cur_interval
            dic[s[_i]] = _i
            ans =max(dp[_i],ans)
        # return
        return ans
```

- 49. 丑数

``` python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        #1.def dp and i means
        #2.recurrence formula
        #3.init dp
        #4.decide loop
        dp = [1] * n
        _a, _b, _c = 0,0,0
        for _i in range(1, n):
            n2, n3, n5 = dp[_a] * 2, dp[_b] * 3, dp[_c] * 5
            # dp[i] = min(dp[a]*2,dp[b]*3,dp[c]*5) three points
            dp[_i] = min(n2, n3, n5)
            if dp[_i] == n2: _a += 1
            if dp[_i] == n3: _b += 1
            if dp[_i] == n5: _c += 1
        return dp[-1]
```

- 60. n 个骰子的点数

``` python
class Solution:
    def dicesProbability(self, n: int) -> List[float]:
        dp = [1 / 6] * 6
        for i in range(2, n + 1):
            tmp = [0] * (5 * i + 1)
            for j in range(len(dp)):
                for k in range(6):
                    tmp[j + k] += dp[j] / 6
            dp = tmp
        return dp
```

- 66. 构建乘积数组

``` python
class Solution:
    def constructArr(self, a: List[int]) -> List[int]:
        # def varible
        n = len(a)
        res = [1] * n
        
        # loop
        tmp = 1
        for _i in range(n):
            res[_i] = tmp
            tmp *= a[_i]
            #print(res)
        # reversed loop
        tmp =1
        for _j in reversed(range(n)):
            res[_j] *= tmp 
            tmp *= a[_j]
            #print(res)
        return res
```

### 数学

- 39. 数组中出现次数超过一半的数字

``` python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        n = len(nums)//2
        if len(nums) ==1: return nums[0]
        dic = {}
        for num in nums:
            if num not in dic:
                dic[num]=1
            else:
                if dic[num]>=n:
                    return num
                else:
                    dic[num] += 1
```

- 62. 圆圈中最后剩下的数

``` python
class Solution:
    def lastRemaining(self, n: int, m: int) -> int:
        ans = 0
        for i in range(2,n+1):
            ans = (ans+m) % i
        return ans
```

- 43. 从 1 到 n 整数中 1 出现的次数

``` python
class Solution:
    def countDigitOne(self, n: int) -> int:
        digit, res = 1, 0
        high, cur, low = n // 10, n % 10, 0
        while high != 0 or cur != 0:
            if cur == 0: res += high * digit
            elif cur == 1: res += high * digit + low + 1
            else: res += (high + 1) * digit
            low += cur * digit
            cur = high % 10
            high //= 10
            digit *= 10
        return res
```

### 位运算

- 15. 二进制中 1 的个数

``` python
class Solution:
    def hammingWeight(self, n: int) -> int:
        res =0
        while n:
            res+= n&1
            n>>=1
        return res
```

- 56. 数组中只出现一次的数字

``` python
class Solution:
    def singleNumbers(self, nums: List[int]) -> List[int]:
        dic,ans = {},[]
        for num in nums:
            if num not in dic:
                dic[num] =True
            else:
                dic[num] = False
        for k,v in dic.items():
            if v: ans.append(k)
        return ans
```

### 其它

- 17. 打印从 1 到最大的 n 位数

``` python
class Solution:
    def printNumbers(self, n: int) -> List[int]:
        res =[]
        for i in range(1,10**n):
            res.append(i)
        return res
```

- 19. 正则表达式匹配

``` python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s) + 1, len(p) + 1
        dp = [[False] * n for _ in range(m)]
        dp[0][0] = True
        # 初始化首行
        for j in range(2, n, 2):
            dp[0][j] = dp[0][j - 2] and p[j - 1] == '*'
        # 状态转移
        for i in range(1, m):
            for j in range(1, n):
                if p[j - 1] == '*':
                    if dp[i][j - 2]: dp[i][j] = True                              # 1.
                    elif dp[i - 1][j] and s[i - 1] == p[j - 2]: dp[i][j] = True   # 2.
                    elif dp[i - 1][j] and p[j - 2] == '.': dp[i][j] = True        # 3.
                else:
                    if dp[i - 1][j - 1] and s[i - 1] == p[j - 1]: dp[i][j] = True # 1.
                    elif dp[i - 1][j - 1] and p[j - 1] == '.': dp[i][j] = True    # 2.
        return dp[-1][-1]
```

- 20. 表示数值的字符串

``` python
class Solution:
    def isNumber(self, s: str) -> bool:
        states = [
            { ' ': 0, 's': 1, 'd': 2, '.': 4 }, # 0. start with 'blank'
            { 'd': 2, '.': 4 } ,                # 1. 'sign' before 'e'
            { 'd': 2, '.': 3, 'e': 5, ' ': 8 }, # 2. 'digit' before 'dot'
            { 'd': 3, 'e': 5, ' ': 8 },         # 3. 'digit' after 'dot'
            { 'd': 3 },                         # 4. 'digit' after 'dot' (‘blank’ before 'dot')
            { 's': 6, 'd': 7 },                 # 5. 'e'
            { 'd': 7 },                         # 6. 'sign' after 'e'
            { 'd': 7, ' ': 8 },                 # 7. 'digit' after 'e'
            { ' ': 8 }                          # 8. end with 'blank'
        ]
        p = 0                           # start with state 0
        for c in s:
            if '0' <= c <= '9': t = 'd' # digit
            elif c in "+-": t = 's'     # sign
            elif c in "eE": t = 'e'     # e or E
            elif c in ". ": t = c       # dot, blank
            else: t = '?'               # unknown
            if t not in states[p]: return False
            p = states[p][t]
        return p in (2, 3, 7, 8)
```

- 44. 数字序列中的某一位数字

``` python
class Solution:
    def findNthDigit(self, n: int) -> int:
        digit, start, count = 1, 1, 9
        while n > count: # 1.
            n -= count
            start *= 10
            digit += 1
            count = 9 * start * digit
        num = start + (n - 1) // digit # 2.
        return int(str(num)[(n - 1) % digit]) # 3.
```

- 46. 把数字翻译成字符串

``` python
class Solution:
    def translateNum(self, num: int) -> int:
        s = str(num)
        # 1.def dp
        n = len(s)
        if n<2:return n
        dp =[0]*(n+1)
        # 3.init dp
        dp[0] = 1
        dp[1] =1
        # 4.decide loop
        for _i in range(2,n+1):
        # 2.recurrence formula
            if '10'<=s[_i-2:_i]<='25':
                dp[_i] = dp[_i-1]+dp[_i-2]                
            else:
                dp[_i] =dp[_i-1]
        # 5.return
        return dp[-1]
```

- 61. 扑克牌顺子

``` python
class Solution:
    def isStraight(self, nums: List[int]) -> bool:
        repeat = set()
        ma, mi = 0, 14
        for num in nums:
            if num == 0: continue # 跳过大小王
            ma = max(ma, num) # 最大牌
            mi = min(mi, num) # 最小牌
            if num in repeat: return False # 若有重复，提前返回 false
            repeat.add(num) # 添加牌至 Set
        return ma - mi < 5 # 最大牌 - 最小牌 < 5 则可构成顺子
```

- 64. 求 1+2+3+...+n

``` python
class Solution:
    # recurion
    def sumNums(self, n: int) -> int:
        # sum = 0
        sum_n= 0
        def rcur(n):
            if n==0:
                return 0
            r = rcur(n-1)
            # regression
            nonlocal sum_n
            sum_n+=r
            return n
        rcur(n)
        # add n
        sum_n=sum_n+n
        return sum_n
```

- 65. 不用加减乘除做加法

``` python
class Solution:
    def add(self, a: int, b: int) -> int:
        x = 0xffffffff
        a, b = a & x, b & x
        while b != 0:
            a, b = (a ^ b), (a & b) << 1 & x
        return a if a <= 0x7fffffff else ~(a ^ x)
```

- 67. 把字符串转换成整数

``` python
class Solution:
    def strToInt(self, str: str) -> int:
        int_max, int_min = 2**31 - 1, -2**31
        str = str.strip()
        if not str:
            return 0
        state = [
            {'s':1, 'd':2, 't':3}, #0起始状态
            {'s':3, 'd':2, 't':3}, #1符号状态
            {'s':3, 'd':2, 't':3}, #2数字状态
            {'s':3, 'd':3, 't':3}  #3终止状态
        ]
        cur, res, flag = 0, 0, 1
        for i in str:
            if i in '+-':
                c = 's'
            elif i.isdigit():
                c = 'd'
            else:
                c = 't'
            cur = state[cur][c]
            if cur == 2:
                res = 10*res + ord(i) - ord('0')
                res = min(int_max, res) if flag == 1 else min(-int_min, res)
            elif cur == 1:
                flag = 1 if i == '+' else -1
        return res*flag 
```

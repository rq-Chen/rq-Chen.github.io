import math
import copy

def TreeGeneration(DSet, ASet, nDepth, currCategory = ''):
    'DSet: A 2D list; ASet: A dict; nDepth: the depth of the current note; currCategory: A string'
    'examples in DSet contain only the attributions in ASet'
    for i in range(nDepth): print('\t', end = '')
    if currCategory: print(currCategory, ': ', sep = '', end = '')
    Classes = [example[-1] for example in DSet]
    CSet = list(set(Classes))
    countClass = [Classes.count(cate) for cate in CSet]
    currIE = 0
    for i in countClass:
        p = i / len(DSet)
        currIE -= p * math.log2(p)

    if len(CSet) == 1:
        print(CSet[0])
        return

    FirstAtt = DSet[0][: -1]
    isAllTheSame = True  # whether the attributions are all the same for examples in DSet
    for example in DSet:
        currAtt = example[: -1]
        if currAtt != FirstAtt:
            isAllTheSame = False
            break
    # if ASet is empty, then FirstAtt and currAtt will always be NULL (also the same)
    if isAllTheSame:
        print(CSet[countClass.index(max(countClass))])
        return

    def InfoGain(att, attIndex):
        currGain = currIE
        for cate in ASet[att]:
            newDSet = [exam for exam in DSet if exam[attIndex] == cate]
            newClasses = [example[-1] for example in newDSet]
            newCSet = set(newClasses)
            newcountClass = [newClasses.count(cate) for cate in newCSet]
            rate = len(newDSet) / len(DSet)
            for i in newcountClass:
                p = i / len(newDSet)
                currGain += p * math.log2(p) * rate
        return currGain

    currIndex, currMaxGain, currBestAtt = -1, 0, 'null'
    for attIndex, att in enumerate(ASet.keys()):
        currGain = InfoGain(att, attIndex)
        if currMaxGain == 0 or currGain > currMaxGain:
            currIndex, currMaxGain, currBestAtt = attIndex, currGain, att
    newASet = copy.deepcopy(ASet)
    newASet.pop(currBestAtt)
    print(currBestAtt, '= ?')
    for cate in ASet[currBestAtt]:
        newDSet = [exam[:currIndex] + exam[currIndex + 1 :] for exam in DSet if exam[currIndex] == cate]
        newCategory = cate
        if len(newDSet) == 0:
            for i in range(nDepth + 1): print('\t', end = '')
            print(newCategory, ': ', sep = '', end = '')
            print(CSet[countClass.index(max(countClass))])
            continue
        TreeGeneration(newDSet, newASet, nDepth + 1, newCategory)
    return   


dataSet = [
        # 1
        ['青绿', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '好瓜'],
        # 2
        ['乌黑', '蜷缩', '沉闷', '清晰', '凹陷', '硬滑', '好瓜'],
        # 3
        ['乌黑', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '好瓜'],
        # 4
        ['青绿', '蜷缩', '沉闷', '清晰', '凹陷', '硬滑', '好瓜'],
        # 5
        ['浅白', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '好瓜'],
        # 6
        ['青绿', '稍蜷', '浊响', '清晰', '稍凹', '软粘', '好瓜'],
        # 7
        ['乌黑', '稍蜷', '浊响', '稍糊', '稍凹', '软粘', '好瓜'],
        # 8
        ['乌黑', '稍蜷', '浊响', '清晰', '稍凹', '硬滑', '好瓜'],

        # ----------------------------------------------------
        # 9
        ['乌黑', '稍蜷', '沉闷', '稍糊', '稍凹', '硬滑', '坏瓜'],
        # 10
        ['青绿', '硬挺', '清脆', '清晰', '平坦', '软粘', '坏瓜'],
        # 11
        ['浅白', '硬挺', '清脆', '模糊', '平坦', '硬滑', '坏瓜'],
        # 12
        ['浅白', '蜷缩', '浊响', '模糊', '平坦', '软粘', '坏瓜'],
        # 13
        ['青绿', '稍蜷', '浊响', '稍糊', '凹陷', '硬滑', '坏瓜'],
        # 14
        ['浅白', '稍蜷', '沉闷', '稍糊', '凹陷', '硬滑', '坏瓜'],
        # 15
        ['乌黑', '稍蜷', '浊响', '清晰', '稍凹', '软粘', '坏瓜'],
        # 16
        ['浅白', '蜷缩', '浊响', '模糊', '平坦', '硬滑', '坏瓜'],
        # 17
        ['青绿', '蜷缩', '沉闷', '稍糊', '稍凹', '硬滑', '坏瓜']
    ]
attSet = {}
attSet['色泽'] = ['乌黑', '青绿', '浅白']
attSet['根蒂'] = ['蜷缩', '稍蜷', '硬挺']
attSet['敲击'] = ['沉闷', '浊响', '清脆']
attSet['纹理'] = ['清晰', '稍糊', '模糊']
attSet['脐部'] = ['平坦', '稍凹', '凹陷']
attSet['触感'] = ['硬滑', '软粘']
TreeGeneration(dataSet, attSet, 0)

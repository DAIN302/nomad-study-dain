import * as crypto from "crypto";

// 블록체인
interface BlockShape {
    hash : string;
    prevHash : string;
    height:number;
    data:string;
}

class Block implements BlockShape {
    public hash: string; // hash는 초기화 필요
    constructor(
        public prevHash : string,
        public height : number,
        public data:string
        // prevHash, height, data 값을 이용해서 hash 의 값을 구할 예정
    ){
        // static 함수를 이용하여 hash변수 초기화
        this.hash = Block.calculateHash(prevHash, height, data)
        // 함수앞에 클래스명을 붙여서 할당해야함 안그럼 에러
    }
    static calculateHash(prevHash:string, height:number, data:string){
        const toHash = `${prevHash}${height}${data}`;   // crpyto 이용
        return crypto.createHash("sha256").update(toHash).digest("hex")
    }
}

class BlockChain {
    private blocks:Block[] // blocks 는 Block클래스의 배열
    constructor(){
        // blocks 초기화
        this.blocks = [];
    }
    // 이전 해쉬값을 불러올 수 있는 함수
    private getPrevHash(){
        if(this.blocks.length === 0) return "" // 값이 없으면 첫번째 해쉬가 없기 떄문에 빈칸 리턴
        return this.blocks[this.blocks.length -1].hash // 값이 있으면 마지막 블럭의 해쉬값 리턴
    }
    // 새로운 블럭을 추가하는 메서드
    // 블럭에 저장하고 싶은 데이터를 보내줘야함 -> 파라미터로 전달
    public addBlock(data:string){
        const newBlock = new Block(this.getPrevHash(), this.blocks.length+1, data);
        // 배열에 추가
        this.blocks.push(newBlock)
    }
    // 블록에 접근할 수 있는 함수
    public getBlocks(){
        // return this.blocks -> 그냥 리턴하면 보안상의 문제가 있음, 누구든지 배열에 접근해서 데이터 변경 가능
        return [...this.blocks]; // 배열안에 있는 데이터를 가진 새로운 배열을 리턴해줌

    }
}

// 새로운 블록체인 생성
const blockchain = new BlockChain();

// 새로운 블럭 추가
blockchain.addBlock("First one");
blockchain.addBlock("second one");
blockchain.addBlock("Third one");

// 모든 블록 불러오기 
// 불러와서 콘솔에 찍기
console.log(blockchain.getBlocks())




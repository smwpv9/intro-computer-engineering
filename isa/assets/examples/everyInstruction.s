.origin 0x0001_0000
.register a0, 10
add zero, ra, sp
addi gp, tp, 0b10_00
sub t0, t1, t2
and t2, s0, s1
andi a0, a1, 0x0_8
or a2, a3, a4
ori a5, a6, 0_8
xor a7, s2, s3
xori s4, s5, 0b0
srl s6, s7, s8
srli s9, s10, 0x0
sra s11, t3, t4
srai t5, t6, 0
sll x0, x1, x2
slli x3, x4, 1
slt x5, x6, x7
slti x8, x9, 1
sltu x10, x11, x12
sltiu x13, x14, -1
auipc x15, 0x10
auipc x15, %pcrel_hi(END)
lui x16, 0x10
lui x16, %hi(END)
lb x17, 0x10(x18)
lb x17, %lo(END)(x18)
lh x19, 0x10(x20)
lh x19, %pcrel_lo(END)(x20)
lw x21, 0x10(x22)
lbu x23, 0x10(x24)
lhu x25, 0x10(x26)
sb x27, 0x10(x28)
sh x29, 0x10(x30)
sw x31, 0x10(a0)
jal a0, 0x10
jal a0, END
jalr a0, 0x10(a0)
jalr a0, %lo(END)(a0)
jalr a0, %pcrel_lo(END)(a0)
beq a0, a1, 0x10
beq a0, a1, END
bne a0, a1, 0x10
blt a0, a1, 0x10
bltu a0, a1, 0x10
bge a0, a1, 0x10
bgeu a0, a1, 0x10
ecall

END:
mv a0, a1
li a0, 0x10
nop
not a0, a1
snez a0, a1
seqz a0, a1
j 0x10
j END
jr a0
ret
ble a0, a1, 0x10
bleu a0, a1, 0x10
bgt a0, a1, 0x10
bgtu a0, a1, 0x10
.insn 0x0

.origin 0x0001_2000
DATA: .word 0x1, 0x2, 0x3, 0x4
.half 0x1, 0x2, 0x3, 0x4
.byte 0x1, 0x2, 0x3, 0x4
.string "Hello Worlds!"

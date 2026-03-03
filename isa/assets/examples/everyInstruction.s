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
sll r0, r1, r2
slli r3, r4, 1
slt r5, r6, r7
slti r8, r9, 1
sltu r10, r11, r12
sltiu r13, r14, -1
auipc r15, 0x10
auipc r15, %pcrel_hi(END)
lui r16, 0x10
lui r16, %hi(END)
lb r17, 0x10(r18)
lb r17, %lo(END)(r18)
lh r19, 0x10(r20)
lh r19, %pcrel_lo(END)(r20)
lw r21, 0x10(r22)
lbu r23, 0x10(r24)
lhu r25, 0x10(r26)
sb r27, 0x10(r28)
sh r29, 0x10(r30)
sw r31, 0x10(a0)
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
